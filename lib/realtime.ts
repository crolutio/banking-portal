import { createCallCenterClient } from "./supabase/call-center-client";

export function subscribeToConversationMessages(
  conversationId: string,
  onNewMessage: (msg: any) => void
) {
  const supabase = createCallCenterClient();
  const channel = supabase
    .channel(`conv:${conversationId}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `conversation_id=eq.${conversationId}`,
      },
      (payload) => {
        const message = payload.new;
        // Only process messages that are not internal and from supported sources
        if (!message.is_internal && (message.source === "banking" || message.source === "contact_center")) {
          onNewMessage(message);
        }
      }
    )
    .subscribe((status) => {
      console.log("[realtime] status:", status, "conversation:", conversationId);
    });

  return () => {
    supabase.removeChannel(channel);
  };
}
