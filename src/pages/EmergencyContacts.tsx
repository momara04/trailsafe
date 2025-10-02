import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Trash2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EmergencyContacts = () => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', phone_number: '', relationship: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('emergency_contacts')
        .select('*')
        .eq('user_id', user.id)
        .order('priority', { ascending: true });

      if (error) throw error;
      setContacts(data || []);
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const handleAddContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from('emergency_contacts')
        .insert({
          user_id: user.id,
          ...newContact,
          priority: contacts.length + 1
        });

      if (error) throw error;

      toast({ title: "Contact added!", description: "Emergency contact has been saved." });
      setNewContact({ name: '', phone_number: '', relationship: '' });
      setShowAdd(false);
      loadContacts();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteContact = async (id: string) => {
    try {
      const { error } = await supabase
        .from('emergency_contacts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({ title: "Contact deleted" });
      loadContacts();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Emergency Contacts</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Emergency Contacts</CardTitle>
              <CardDescription>
                These contacts will be notified in case of an emergency or SOS alert
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contacts.map((contact) => (
                  <div key={contact.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">{contact.name}</h3>
                      <p className="text-sm text-muted-foreground">{contact.phone_number}</p>
                      {contact.relationship && (
                        <p className="text-xs text-muted-foreground">{contact.relationship}</p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteContact(contact.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                {contacts.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No emergency contacts added yet
                  </p>
                )}
              </div>

              {!showAdd && (
                <Button className="w-full mt-4" onClick={() => setShowAdd(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Contact
                </Button>
              )}

              {showAdd && (
                <form onSubmit={handleAddContact} className="mt-4 space-y-4 p-4 border rounded-lg">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      required
                      value={newContact.name}
                      onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={newContact.phone_number}
                      onChange={(e) => setNewContact({ ...newContact, phone_number: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="relationship">Relationship (Optional)</Label>
                    <Input
                      id="relationship"
                      value={newContact.relationship}
                      onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" disabled={loading}>
                      {loading ? "Adding..." : "Add Contact"}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setShowAdd(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default EmergencyContacts;
