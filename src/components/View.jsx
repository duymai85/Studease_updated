import { useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export const View = (props) => {
  useEffect(() => {
    props.changeUI(true);
    // eslint-disable-next-line
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <>
      <button className='bg-blue-700 text-lg text-white px-7 py-2'>
        Landscape
      </button>
      <Carousel
        className='h-full'
        swipeable={false}
        draggable={false}
        showDots={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        // autoPlay={this.props.deviceType !== "mobile" ? true : false}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition='all .5'
        transitionDuration={500}
        containerclassName='carousel-container'
        removeArrowOnDeviceType={['tablet', 'mobile']}
        // deviceType={this.props.deviceType}
        dotListclassName='custom-dot-list-style'
        itemclassName='carousel-item-padding-40-px'
      >
        <div className=''>
          <h1 className='text-xl font-bold py-2 flex justify-center items-center'>
            What's this location?
          </h1>

          <div className='w-full flex justify-center'>
            <div className='w-1/3'>
              <img
                src='https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg'
                alt='mobile phone'
              ></img>
            </div>
          </div>
        </div>
        <div>
          <h1 className='text-xl font-bold py-2 flex justify-center items-center'>
            What's this location?
          </h1>

          <div className='w-full flex justify-center'>
            <div className='w-1/3'>
              <img
                src='https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg'
                alt='mobile phone'
              ></img>
            </div>
          </div>
        </div>
        <div>
          <h1 className='text-xl font-bold py-2 flex justify-center items-center'>
            What's this location?
          </h1>

          <div className='w-full flex justify-center'>
            <div className='w-1/3'>
              <img
                src='https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png'
                alt='mobile phone'
              ></img>
            </div>
          </div>
        </div>
        <div>
          <h1 className='text-xl font-bold py-2 flex justify-center items-center'>
            What's this location?
          </h1>

          <div className='w-full flex justify-center'>
            <div className='w-1/3'>
              <img
                src='https://www.seiu1000.org/sites/main/files/main-images/camera_lense_0.jpeg'
                alt='camera'
              ></img>
            </div>
          </div>
        </div>
      </Carousel>
      ;
    </>
  );
};
