import Carousel from 'react-bootstrap/Carousel';

import './slider.scss';

import slide1 from '../../assets/img/slide_1.png';
import slide2 from '../../assets/img/slide_2.png';
import slide3 from '../../assets/img/slide_3.png';

const Slider = () => {
    return (
        <Carousel>
            <Carousel.Item className="slideItem">
                <img className="slideItem__img" src={slide1} alt="Slide" />
            </Carousel.Item>
            <Carousel.Item className="slideItem">
                <img className="slideItem__img" src={slide2} alt="Slide" />
            </Carousel.Item>
            <Carousel.Item className="slideItem">
                <img className="slideItem__img" src={slide3} alt="Slide" />
            </Carousel.Item>
        </Carousel>
    )
}

export default Slider;