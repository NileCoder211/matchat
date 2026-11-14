import { useChatStore } from "../store/useChatStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";
import { ArrowLeftIcon } from "lucide-react";

function ChatPage() {
  const { activeTab, selectedUser, setSelectedUser } = useChatStore();

  return (
   <div className="h-screen w-screen bg-slate-900">
      <div className="w-full h-full flex overflow-hidden">
        <BorderAnimatedContainer className="flex w-full h-full">
          
          {/* SIDEBAR - Hide on mobile if a user is selected */}
          <div
            className={`
              ${selectedUser ? "hidden" : "flex"} 
              flex-col
              w-full
              min-[769px]:flex  /* Always show on desktop */
              min-[769px]:w-[30%]
              bg-slate-800/50 backdrop-blur-sm
            `}
          >
            <ProfileHeader />
            <ActiveTabSwitch />
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {activeTab === "chats" ? <ChatsList /> : <ContactList />}
            </div>
          </div>

          {/* CHAT AREA - Show on mobile ONLY if a user is selected */}
          <div
            className={`
              ${selectedUser ? "flex" : "hidden"}
              flex-col
              w-full
              min-[769px]:flex /* Always show on desktop */
              min-[769px]:w-[70%]
              bg-slate-900/50 backdrop-blur-sm
            `}
          >
            {selectedUser ? (
              <>
                {/* Mobile Back Button (Important so you can deselect user) */}
                <button 
                  className="min-[769px]:hidden p-4 text-white"
                  onClick={() => setSelectedUser(null)}
                >
                  <ArrowLeftIcon />
                </button>
                <ChatContainer />
              </>
            ) : (
              <NoConversationPlaceholder />
            )}
          </div>
          
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}

export default ChatPage;
