import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
// Importa suas 3 imagens de slide (completas)
import slide1Img from '../assets/Carousel 1.png';
import slide2Img from '../assets/Carousel 2.png';
import slide3Img from '../assets/Carousel 3.png';

// Nossos dados agora são apenas a lista de imagens
const slides = [slide1Img, slide2Img, slide3Img];

function Carousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    // A lógica de navegação (next, prev, timer) permanece a mesma
    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? slides.length - 1 : prevIndex - 1
        );
    };

    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="carousel">
            {/* 1. O "Track" que se move */}
            <div
                className="carousel-track"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {/* Mapeia as imagens */}
                {slides.map((imgSrc, index) => (
                    <div
                        key={index}
                        className="carousel-slide"
                        // Define a imagem de fundo do slide
                        style={{ backgroundImage: `url(${imgSrc})` }}
                    >
                        {/* Não precisamos de mais nada aqui dentro,
                pois o conteúdo (texto, oferta) está na imagem. */}
                    </div>
                ))}
            </div>

            {/* 2. Botões de Seta (do wireframe) */}
            <button className="carousel-arrow arrow-left" onClick={prevSlide}>
                <ChevronLeft size={28} />
            </button>
            <button className="carousel-arrow arrow-right" onClick={nextSlide}>
                <ChevronRight size={28} />
            </button>

            {/* 3. Indicadores (Dots) (do wireframe) */}
            <div className="carousel-dots">
                {slides.map((_, index) => (
                    <div
                        key={index}
                        className={`dot ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => setCurrentIndex(index)}
                    ></div>
                ))}
            </div>
        </section>
    );
}

export default Carousel;