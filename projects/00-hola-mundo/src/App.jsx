import { useState } from 'react'
import './App.css'
import { TwitterFollowCard } from "./TwitterFollowCard";

export function App(){
    // estas pasando una funcion como parametro para que la ejecute en otro lado
    // const format = (userName) => `@${userName}`
    //podrian haber ocaciones que toque mandar todas las props juntas son malas practicas
    // const midudev = { isFollowing: true, userName: 'midudev'}
    // const pheralb = { isFollowing: false, userName: 'pheralb'}
    // en el TwitterFollowCard  {...midudev}
    //esto es para el ejemplo cuando se de click en el boton y mostrar que si cambia el estado
    // se renderiza todo asi solo haya hecho cambio en 1 componente
    const [name, setName] = useState('midudev')

    const users = [
        {
            userName: 'midudev',
            name: 'Miguel Ángel Durán',
            isFollowing: true
        },
        {
            userName: 'pheralb',
            name: 'Pablo H',
            isFollowing: false
        },
        {
            userName: 'PacoHdezs',
            name: 'Paco Hdez',
            isFollowing: true
        },
        {
            userName: 'TMChein',
            name: 'Tomas',
            isFollowing: false
        }
    ]

    return(
        <section className='App'>
            {/*<TwitterFollowCard userName={name} initialIsFollowing={true} >
            John Beta
            </TwitterFollowCard>
            <TwitterFollowCard userName="pheralb">
            Pablo Hernandez
            </TwitterFollowCard>*/}
          {/*  <button onClick={() => setName('Pedro')}>
                Cambio Nombre
            </button>*/}
            {
                users.map(({ userName, name, isFollowing })=> (
                    <TwitterFollowCard
                    key={userName}//un identificar unico para usar el domvirtual usa algo unico del elemento
                    userName={userName}
                    initialIsFollowing={isFollowing}
                    >
                        {name}
                    </TwitterFollowCard>
                ))
            }
           
       </section>
    )
}