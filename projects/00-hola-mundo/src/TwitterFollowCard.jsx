import { useState } from 'react' //4.1k(gzipped: 1.k)
export function TwitterFollowCard({ children, userName = 'unknow', name, initialIsFollowing}){
    //se le puede poner un valor por defecto si no viene algo en los parametros ej
    //userName = 'unknow'
    //renderizado condicional
  //foma larga
    // const state = useState(false)//nos devuelve un array de  2 posiciones
    // const isFollowing = state[0] // primera posicion nos devuelve el valor del estado
    // const setIsFollowing = state[1] // una función que nos permite actualizar el estado para nueva version
 //forma corta
   const [isFollowing, setIsFollowing] = useState(initialIsFollowing)

    const text = isFollowing ? 'Siguiendo' : 'Seguir'
    //va tener un estilo dependiendo del estado
    const buttonClassName = isFollowing 
    ? 'tw-followCard-button is-following' 
    : 'tw-followCard-button'

    //estado interno de cada elemento no esta compartido
    const handleClick = () =>{
        setIsFollowing(!isFollowing)
    }

    return(
       <article className="tw-followCard">
        <header className="tw-followCard-header">
            <img 
                className="tw-followCard-avatar"
                src={`https://unavatar.io/${userName}`}
                alt="El avatar carita sonriendo" />
            <div className="tw-followCard-info">
                <strong>{children}</strong>
                <span 
                className="tw-followCard-infoUserName">@{userName}</span>
            </div>
        </header>
        <aside>
            <button className={buttonClassName} onClick={handleClick}>
                <span className="tw-followCard-text">{text}</span>
                <span className="tw-followCard-stopFollow">Dejar de seguir</span>
            </button>
        </aside>
       </article>
    )
}