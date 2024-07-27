'use client'

import { ThemeSwitcher } from "./ThemeSwitcher";
import {
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation" 

import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function NavBar() {
  const router = useRouter()

  const logout = async () => {
    try {
      const response = await axios.get('/api/users/logout')
      toast.success('Logout Successful')
      router.push('/login')
    }
    catch (error: any){
      console.log(error.message)
      toast.error(error.message)
    }
  }

  return (
    <div  className="flex flex-col items-center justify-center">
      <Toaster />
      <Navbar position="static" isBordered className='flex flex-row items-center justify-center'>

        <NavbarContent>
          YAY IM MAKING SOMETHING
        </NavbarContent>
        
        <div className="flex flex-row">
          <NavbarContent className="mr-3">
            <Button 
              color='danger'
              variant="shadow"
              onClick={() => router.push('/signup')}
            >Signup</Button>

            <Button
              color='danger'
              variant="shadow"
              onClick={logout}
            >
            Logout</Button>
          </NavbarContent>

          <NavbarContent className="m-auto">
            <ThemeSwitcher />
          </NavbarContent>
        </div>
      </Navbar>
    </div>
  )
}