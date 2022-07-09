import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useWindowSize from '../../hooks/useWindow';

const truncateText = (text, start, len) => {
    return text.length > len ? text.slice(start, len) + "..." : text;
}

const getDateFromDateTime = dateTime => {
    const dateTimeString = new Date(dateTime).toString()
    const dateTimeStringArray = dateTimeString.split(" ")

    return `${dateTimeStringArray[1]} ${dateTimeStringArray[2]}, ${dateTimeStringArray[3]}`
}

const BlogTile = (props) => {

    const { title, dateTime, coverImageURL, contentPreview, id } = props.blogData;

    const [width] = useWindowSize();
    const { asPath } = useRouter();

    return (
        <div className="container mt-5">
            <Link href={asPath + `/${id}`}>
                <div className="row" style={{ cursor: 'pointer' }}>
                    <div className="col-lg-5 col-12">
                        <Image src={coverImageURL} width="420" height="225" className="img-fluid" objectFit='cover' alt={title} />
                    </div>
                    <div className="col-lg-7 col-12">
                        <h3 style={{ fontWeight: '600', marginTop: width > 1280 ? '0' : '10px' }}>{title}</h3>
                        <p style={{ fontSize: '19px' }}>{truncateText(contentPreview, 0, 350)}</p>
                        <h5 style={{ fontWeight: '600' }}>{getDateFromDateTime(dateTime)}</h5>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default BlogTile;