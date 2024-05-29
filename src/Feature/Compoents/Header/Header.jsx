import React, { useId} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {Container} from '../index';
import { Logout}  from '../index';

function Header() {
  const Auth=useSelector((state)=>state.Auth.status);
  const Nav = useNavigate();
  const ID=useId();

  const NavRender = [{
    name: "Home",
    slug: "",
    active: true
  },
  {
    name: "Login",
    slug: "/Login",
    active: !Auth
  },
  {
    name:"Singup",
    slug:"/Singup",
    active:!Auth
  },
  {
    name:"AllPost",
    slug:"/AllPost",
    active:true
  },
  {
    name:"AddPost",
    slug:"/AddPost",
    active:Auth
  }
  ]
  return (
    <header className='py-3 shadow bg-gray-500 w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between'>
    <Container >
      <nav className='flex'>
        <ul className='flex ml-auto'>
          {NavRender.map((item) => 
          item.active ? (
            <li key={item.name}>
              <button
              onClick={() => Nav(item.slug)}
              className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
              >{item.name}</button>
            </li>
          ) : null
          )}
          {Auth && (
            <li>
              <Logout/>
            </li>
          )}
        </ul>
      </nav>
      </Container>
  </header>
  )
}

export default Header