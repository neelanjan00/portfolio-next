import { useState } from 'react';
import emailjs from 'emailjs-com';
import { getLinkedInIcon, getGithubIcon, getEmailIcon, getTwitterIcon } from '../../assets/inline-svgs';

const Footer = () => {

    var [formState, setFormState] = useState({ name: null, email: null, message: null })

    const handleSubmit = event => {
        event.preventDefault()

        emailjs.sendForm('neelanjanmanna@gmail.com', 'portfolio_template', event.target, 'user_LPwcjuOkuGEbdRD5g3X2W')
            .then(result => console.log(result.text), error => console.log(error.text))
            .then(event.target.reset())
    }

    const handleInputChange = event => {
        event.preventDefault()
        setFormState({
            ...formState,
            [event.target.name]: event.target.value
        })
    }

    return (
        <div style={{ color: 'white' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#000000" fillOpacity="1" d="M0,96L720,288L1440,160L1440,320L720,320L0,320Z" />
            </svg>
            <div style={{ backgroundColor: 'black' }} className="py-5">
                <div className="container">
                    <h1 className="py-3">CONTACT ME</h1>
                    <div className="row">
                        <div className="col-lg-7 col-12">
                            <form onSubmit={handleSubmit}>
                                <div className="row pb-4">
                                    <div className="col-lg-6 col-12">
                                        <input type="text" name="name" onChange={handleInputChange}
                                            style={{ borderRadius: '0', border: 'none' }}
                                            className="form-control" placeholder="Full Name" />
                                    </div>
                                    <div className="col-lg-6 col-12 pt-4 pt-lg-0">
                                        <input type="email" name="email" onChange={handleInputChange}
                                            style={{ borderRadius: '0', border: 'none' }}
                                            className="form-control" placeholder="Email" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <textarea name="message" className="form-control" onChange={handleInputChange}
                                        style={{ borderRadius: '0', border: 'none' }} placeholder="Your Message"></textarea>
                                </div>
                                <center>
                                    <button className="btn btn-outline-dark mt-2"
                                        style={{
                                            borderRadius: '0px', color: 'white',
                                            border: '1px solid white'
                                        }}>
                                        SUBMIT
                                    </button>
                                </center>
                            </form>
                        </div>
                        <div className="col-lg-5 col-12 mt-5">
                            <div className="row">
                                <div className="col-12">
                                    <a href="https://www.github.com/neelanjan00" target="_blank" rel="noopener noreferrer">
                                        <div style={{ 'float': 'right' }}>
                                            {getGithubIcon('white')}
                                        </div>
                                    </a>
                                    <a href="https://www.linkedin.com/in/neelanjan00" target="_blank" rel="noopener noreferrer">
                                        <div style={{ 'float': 'right' }}>
                                            {getLinkedInIcon('white')}
                                        </div>
                                    </a>
                                    <a href="https://www.twitter.com/NeelanjanManna" target="_blank" rel="noopener noreferrer">
                                        <div style={{ 'float': 'right' }}>
                                            {getTwitterIcon('white')}
                                        </div>
                                    </a>
                                    <a href="mailto:hi@neelanjan.dev" target="_blank" rel="noopener noreferrer">
                                        <div style={{ 'float': 'right' }}>
                                            {getEmailIcon('white')}
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <h5 style={{ float: 'right' }} className="pt-3">
                                        © Neelanjan Manna, 2020 - {new Date().getFullYear()}
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;