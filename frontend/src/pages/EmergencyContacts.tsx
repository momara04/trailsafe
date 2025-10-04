import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Trash2, Plus, Phone, UserCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EmergencyContacts = () => {
  const [contacts, setContacts] = useState([
    { id: "1", name: "Sarah Johnson", phone_number: "+1 (555) 123-4567", relationship: "Spouse", priority: 1 },
    { id: "2", name: "Michael Chen", phone_number: "+1 (555) 234-5678", relationship: "Brother", priority: 2 },
    { id: "3", name: "Emma Wilson", phone_number: "+1 (555) 345-6789", relationship: "Friend", priority: 3 }
  ]);
  const [showAdd, setShowAdd] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', phone_number: '', relationship: '' });
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = (contacts.length + 1).toString();
    setContacts([...contacts, { ...newContact, id: newId, priority: contacts.length + 1 }]);
    toast({ title: "Contact added!", description: "Emergency contact has been saved." });
    setNewContact({ name: '', phone_number: '', relationship: '' });
    setShowAdd(false);
  };

  const handleDeleteContact = (id: string) => {
    setContacts(contacts.filter(c => c.id !== id));
    toast({ title: "Contact deleted" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Emergency Contacts</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
          <Card className="border-2 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Phone className="h-6 w-6 text-primary" />
                Your Emergency Contacts
              </CardTitle>
              <CardDescription>
                These contacts will be notified in case of an emergency or SOS alert
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contacts.map((contact, index) => (
                  <div key={contact.id} className="flex items-center justify-between p-6 border-2 rounded-lg bg-card hover:bg-accent/5 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 rounded-full p-3">
                        <UserCircle className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-lg">{contact.name}</h3>
                          {index === 0 && <Badge variant="default">Primary</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <Phone className="h-3 w-3" />
                          {contact.phone_number}
                        </p>
                        {contact.relationship && (
                          <p className="text-xs text-muted-foreground mt-1">{contact.relationship}</p>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteContact(contact.id)}
                      className="hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                {contacts.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <UserCircle className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">No emergency contacts added yet</p>
                  </div>
                )}
              </div>

              {!showAdd && (
                <Button className="w-full mt-6 border-2 shadow-md" onClick={() => setShowAdd(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Contact
                </Button>
              )}

              {showAdd && (
                <form onSubmit={handleAddContact} className="mt-6 space-y-4 p-6 border-2 rounded-lg bg-accent/5">
                  <h3 className="font-bold text-lg mb-4">Add New Contact</h3>
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      required
                      value={newContact.name}
                      onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                      className="border-2 mt-1"
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
                      className="border-2 mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="relationship">Relationship (Optional)</Label>
                    <Input
                      id="relationship"
                      value={newContact.relationship}
                      onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
                      className="border-2 mt-1"
                    />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button type="submit" className="flex-1">
                      Add Contact
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setShowAdd(false)} className="flex-1 border-2">
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
