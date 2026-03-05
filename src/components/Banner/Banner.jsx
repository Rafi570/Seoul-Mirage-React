
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"

// Assets
import banner1 from "../../assets/img/banner2.png"
import banner2 from "../../assets/img/banner2.png"
import banner3 from "../../assets/img/banner2.png"

const bannerData = [
  {
    id: 1,
    img: banner1,
    title: "Discover your skin's true potential",
    desc: "Premium skincare that combines innovation with clean, effective ingredients for all skin types.",
  },
  {
    id: 2,
    img: banner2,
    title: "Radiance Redefined",
    desc: "Experience the glow with our natural ingredient formula for a healthier look.",
  },
  {
    id: 3,
    img: banner3,
    title: "Modern Beauty Standards",
    desc: "Empowering your natural beauty with science-backed skincare solutions.",
  },
]

export default function Banner() {
  const [emblaRef] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 5000, stopOnInteraction: true })]
  )

  return (
    <section className="w-full overflow-hidden">
      <div className="embla" ref={emblaRef}>
        <div className="flex">
          {bannerData.map((banner) => (
            <div
              key={banner.id}
              className="min-w-full relative h-[80vh] bg-slate-100"
            >
              {/* Image */}
              <img
                src={banner.img}
                alt={banner.title}
                className="absolute inset-0 h-full w-full object-cover object-[center_5%] md:object-[center_10%]"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent flex items-center">
                <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8">
                  <div className="max-w-3xl space-y-6 text-white">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
                      {banner.title}
                    </h1>

                    <p className="text-lg md:text-xl text-slate-100 max-w-lg leading-relaxed">
                      {banner.desc}
                    </p>

                    <div className="flex gap-4 pt-4">
                      <button className="rounded-full px-10 h-14 bg-white text-black hover:bg-slate-200 font-semibold transition">
                        Shop Now
                      </button>

                      <button className="rounded-full px-10 h-14 border-2 border-white text-white hover:bg-white/10 font-semibold transition">
                        About Us
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}