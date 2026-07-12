"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { isValid, format } from "date-fns";
import { ar } from "date-fns/locale";
import { TicketType } from "@/app/(DashboardLayout)/types/ticket";
import CardBox from "../../shared/CardBox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ChevronDown } from "lucide-react";

const agents = [
  { id: 1, name: "عمر", photo: "/images/profile/user-10.jpg" },
  { id: 2, name: "سالم", photo: "/images/profile/user-2.jpg" },
  { id: 3, name: "جابر", photo: "/images/profile/user-3.jpg" },
  { id: 4, name: "يوسف", photo: "/images/profile/user-8.jpg" },
];

const CreateTicketForm = () => {
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [ticketId, setTicketId] = useState<number | undefined>(undefined);
  const [ticketDate, setTicketDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [ticketTitle, setTicketTitle] = useState("");
  const [ticketDescription, setTicketDescription] = useState("");
  const [selectedAgent, setSelectedAgent] = useState(agents[0]);
  const [agentPhoto, setAgentPhoto] = useState(agents[0].photo);

  const router = useRouter();

  // Fetch tickets to calculate new ID
  useEffect(() => {
    const fetchTickets = async () => {
      const res = await fetch("/api/ticket", {
        method: "GET",
        headers: { browserrefreshed: "false" },
      });
      const data = await res.json();
      if (data?.data) {
        setTickets(data.data);
        const maxId = data.data.reduce(
          (max: number, ticket: TicketType) => (ticket.Id > max ? ticket.Id : max),
          0
        );
        setTicketId(maxId + 1);
      }
    };
    fetchTickets();
  }, []);

  // Submit new ticket to API
  const handleSubmit = async () => {
    if (!ticketTitle || !ticketDescription) {
      alert("يرجى تعبئة جميع الحقول.");
      return;
    }

    const newTicket: TicketType = {
      Id: ticketId!,
      ticketTitle,
      ticketDescription,
      Status: "Open",
      Label: "primary",
      thumb: agentPhoto,
      AgentName: selectedAgent.name,
      Date: new Date(ticketDate),
      deleted: false,
    };

    try {
      await fetch("/api/ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTicket),
      });

      resetForm();
      router.push("/apps/tickets");
    } catch (error) {
      console.error("Failed to create ticket", error);
    }
  };

  const resetForm = () => {
    setTicketDate(new Date().toISOString().split("T")[0]);
    setTicketTitle("");
    setTicketDescription("");
    setSelectedAgent(agents[0]);
    setAgentPhoto(agents[0].photo);
  };

  const parsedDate = isValid(new Date(ticketDate))
    ? new Date(ticketDate)
    : new Date();
  const formattedOrderDate = format(parsedDate, "EEEE, d MMMM yyyy", { locale: ar });

  return (
    <CardBox>
      <h2 className="text-lg font-semibold mb-4">إنشاء تذكرة جديدة</h2>
      <p>المعرف: {ticketId !== undefined ? ticketId : ""}</p>
      <p>التاريخ: {formattedOrderDate}</p>

      <div className="bg-lightgray dark:bg-gray-800/70 p-6 my-6 rounded-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Ticket Title */}
          <div>
            <Label htmlFor="ticketTitle" className="mb-2 block">
              عنوان التذكرة
            </Label>
            <Input
              id="ticketTitle"
              value={ticketTitle}
              onChange={(e) => setTicketTitle(e.target.value)}
              placeholder="عنوان التذكرة"
              className="w-full"
            />
          </div>

          {/* Ticket Description */}
          <div>
            <Label htmlFor="ticketDescription" className="mb-2 block">
              وصف التذكرة
            </Label>
            <Input
              id="ticketDescription"
              value={ticketDescription}
              onChange={(e) => setTicketDescription(e.target.value)}
              placeholder="وصف التذكرة"
              className="w-full"
            />
          </div>
        </div>

        {/* Dropdown + Actions */}
        <div className="flex flex-wrap items-center justify-between mt-6 gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="default">{selectedAgent.name}
                <ChevronDown className="h-4 w-4 ms-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="rounded-md">
              {agents.map((agent) => (
                <DropdownMenuItem
                  key={agent.id}
                  onClick={() => {
                    setSelectedAgent(agent);
                    setAgentPhoto(agent.photo);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={agent.photo} alt={agent.name} width={40} height={40}/>
                      <AvatarFallback>{agent.name[0]}</AvatarFallback>
                    </Avatar>
                    <span>{agent.name}</span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex gap-3">
            <Button onClick={handleSubmit}>
              حفظ
            </Button>
            <Button
              variant="error"
              onClick={() => router.push("/apps/tickets")}
            >
              إلغاء
            </Button>
          </div>
        </div>
      </div>
    </CardBox>
  );
};

export default CreateTicketForm;
