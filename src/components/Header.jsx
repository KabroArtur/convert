import React from 'react';

const Header = (props) =>{
    return(
        <>
            <header>
                    <div className='row'>
                        <div className='left'>
                            <h2>Kabro Arthur for ITOP1000</h2>
                        </div>
                        <div className='right'>
                            <div className='content'>
                                <p>{props.usd}</p>
                                <p>{props.euro}</p>
                            </div>
                        </div>
                    </div>
            </header>
        </>
    );
}
export default Header;