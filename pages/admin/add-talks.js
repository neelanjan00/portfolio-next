import {useState} from 'react';
import Footer from '../../components/footer/footer';
import Navbar from '../../components/navbar/navbar';
import { db } from '../../services/firebase';
import { withProtected } from '../../hooks/useCustomRoutes';

const AddTalkVideos = () => {

    const [formState, setFormState] = useState({
        dateTime: '',
        embedURL: ''
    });
    
    const handleInputChange = event => {
            
        event.preventDefault()

        setFormState({
            ...formState,
            [event.target.name] : event.target.value
        })
    }

    const formSubmitHandler = async event => {
        event.preventDefault()
        event.target.reset()

        try {
            const uploadDataSnapshot = await db.collection('videos').add({ ...formState, dateTime: Date.now() })

            if(uploadDataSnapshot)
                alert("Data Uploaded Successfully")
        }
        
        catch(err) {
            alert(err)
        }

        return true
    }


    return (
        <div>
            <Navbar />

            <div className="container p-5" style={{ backgroundColor: 'lightgrey' }}>
                <h1 style={{ textAlign: 'center', fontWeight: '800' }} className="pb-4">ADD TALK VIDEO</h1>
                <form onSubmit={formSubmitHandler}>
                    <div className="row">
                        <div className="col-12">
                            <input type="text" name="embedURL" onChange={handleInputChange}
                                style={{ borderRadius: '0', border: 'none' }}
                                className="form-control" placeholder="YouTube Embed URL" />
                        </div>
                    </div>
                    <div style={{display: 'grid', placeItems: 'center'}}>
                        <button className="btn btn-outline-secondary rounded-0 mt-4">SUBMIT</button>
                    </div>
                </form>
            </div>

            <Footer />
        </div>
    );
}

export default withProtected(AddTalkVideos);
