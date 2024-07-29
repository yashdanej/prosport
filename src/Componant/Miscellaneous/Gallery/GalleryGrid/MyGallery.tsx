import React from 'react'
import { Gallery, Item } from "react-photoswipe-gallery";
import { Link } from 'react-router-dom';
import { Href } from '../../../../utils/Constant';
import { galleryGridImages } from '../../../../Data/Gallery/Gallery';
import { dynamicImage } from '../../../../Service';

const MyGallery = () => {
  return (
    <Gallery>
      {galleryGridImages.map((item, index) => (
        <figure className="col-xl-3 col-md-4 col-xs-6 m-0" key={index}>
          <Item original={dynamicImage(`${item}`)} >
            {({ ref, open }) => (
              <Link to={Href} onClick={open}>
                {/* <img className="img-thumbnail mb-4" ref={ref as React.MutableRefObject<HTMLImageElement>} src={dynamicImage(`${item}`)} alt="image" /> */}
              </Link>
            )}
          </Item>
        </figure>
      ))}
    </Gallery>
  )
}

export default MyGallery