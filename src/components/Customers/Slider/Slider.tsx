import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { reviewsData } from "./Slider.data";
import ImageContainer from "../../ImageContainer/ImageContainer";

const Slider = () => {
  return (
    <div>
      <Swiper
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 15,
          },
        }}
        freeMode={true}
        pagination={{
          clickable: true,
          el: ".reviews-pagination",
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="w-[310px] md:w-[420px]"
      >
        {reviewsData.map(({ id, image, name, review }) => {
          const props = { image, name };
          return (
            <SwiperSlide key={id}>
              <div className="p-5 mx-2 mt-2 hud shadow-glow-sm">
                <span className="block font-mono text-5xl leading-none text-amber">
                  &ldquo;
                </span>
                <ImageContainer {...props} />
                <h4 className="mt-4 font-mono text-sm font-bold tracking-widest text-center uppercase text-neon">
                  {name}
                </h4>
                <p className="mt-3 text-sm leading-relaxed text-center text-[#CFFFD9]/80">
                  {review}
                </p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="flex justify-center gap-1.5 mt-5 reviews-pagination" />
    </div>
  );
};

export default Slider;
