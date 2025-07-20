import React from 'react'
import { Outlet } from 'react-router-dom'
import ChatProvider from './context/ChatProvider'

const ChatLayout = () => {
  return (
    <ChatProvider>
        <Outlet/>
    </ChatProvider>
  )
}

export default ChatLayout;