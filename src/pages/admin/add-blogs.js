import { useState } from 'react';
import Footer from '../../components/footer/footer';
import Navbar from '../../components/navbar/navbar';
import { storage, db } from '../../services/firebase';
import { withProtected } from '../../hooks/useCustomRoutes';

const AddBlogs = () => {

    const [blogState, setBlogState] = useState({
        contentPreview: '',
        coverImageURL: '',
        markdownURL: '',
        title: '',
        dateTime: '',
    })

    const [coverImage, setCoverImage] = useState(null)
    const [markdownFile, setMarkdownFile] = useState(null)

    const blogSubmitHandler = async event => {
        event.preventDefault()
        event.target.reset()

        try {
            const uploadCoverImageSnapshot = await storage.ref(`blog-cover-images/${coverImage.name}`).put(coverImage)

            const coverImageURL = await uploadCoverImageSnapshot.ref.getDownloadURL()

            const uploadMarkdownFileSnapshot = await storage.ref(`blogs/${markdownFile.name}`).put(markdownFile)

            const markdownURL = await uploadMarkdownFileSnapshot.ref.getDownloadURL()

            const uploadDataSnapshot = await db.collection('blogs').add({ ...blogState, coverImageURL: coverImageURL, markdownURL: markdownURL, dateTime: new Date(blogState.dateTime).getTime() })

            if (uploadDataSnapshot)
                alert("Data Uploaded Successfully")
        }

        catch (err) {
            alert(err)
        }

        return true
    }

    const handleInputChange = event => {
        event.preventDefault()

        setBlogState({
            ...blogState,
            [event.target.name]: event.target.value
        })
    }

    const handleImageInputChange = event => {
        event.preventDefault()

        if (event.target.files[0])
            setCoverImage(event.target.files[0])
    }

    const handleMarkdownInputChange = event => {
        event.preventDefault()

        if (event.target.files[0])
            setMarkdownFile(event.target.files[0])
    }

    return (
        <>
            <Navbar />
            
            <div className='container-fluid'>
                <div className="container p-5" style={{ backgroundColor: 'lightgrey' }}>
                    <h1 style={{ textAlign: 'center', fontWeight: '800' }} className="pb-4">ADD BLOG</h1>
                    <form onSubmit={blogSubmitHandler}>
                        <div className="row">
                            <div className="col-lg-6 col-12">
                                <input type="text" name="title" onChange={handleInputChange}
                                    style={{ borderRadius: '0', border: 'none' }}
                                    className="form-control" placeholder="Blog Title" />
                            </div>
                            <div className="col-lg-6 col-12 pt-lg-0 pt-4">
                                <input type="date" name="dateTime" onChange={handleInputChange}
                                    style={{ borderRadius: '0', border: 'none' }}
                                    className="form-control" placeholder="Blog Publish Date" />
                            </div>
                        </div>
                        <div className="form-group pt-3">
                            <textarea name="contentPreview" rows="5" className="form-control" onChange={handleInputChange}
                                style={{ borderRadius: '0', border: 'none' }} placeholder="Content Preview"></textarea>
                        </div>
                        <div className='row mt-4'>
                            <div className="col-lg-6 col-12">
                                <label htmlFor="cover-image">Upload Cover Image</label>
                                <input type="file" className="form-control-file" id="cover-image" onChange={handleImageInputChange} />
                            </div>
                            <div className="col-lg-6 col-12">
                                <label htmlFor="markdown-file">Upload Markdown File</label>
                                <input type="file" className="form-control-file" id="markdown-file" onChange={handleMarkdownInputChange} />
                            </div>
                        </div>
                        <div style={{ display: 'grid', placeItems: 'center' }}>
                            <button className="btn btn-outline-secondary rounded-0 mt-4">SUBMIT</button>
                        </div>
                    </form>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default withProtected(AddBlogs);