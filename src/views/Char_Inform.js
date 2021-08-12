import React from 'react'
import Modal from 'react-modal'
import './Char_Info.css'

Modal.setAppElement('#root')

const InfoModal = (props) => {
    const{open,close,header} = props;
    return(
        <div className={ open ? 'openModal modal' : 'modal' }>
            { open ? (
                <section>
                    <header>
                        {header}
                        <button className="close" onClick={close}> &times;</button>
                    </header>
                    <main>
                        {props.children}
                    </main>
                </section>
            ) : null }
        </div>
    )
}

export default InfoModal
