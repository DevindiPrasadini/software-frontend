export default function LandingPage() {
  return (
    <div className="relative h-full w-full overflow-hidden">

      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/homepageVideo.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-4 px-4 py-8 text-center overflow-y-auto">

        <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white backdrop-blur-md sm:text-sm">
          Premium Computer Store
        </span>

        <h1 className="max-w-4xl text-2xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
          Welcome to
          <span className="block text-accent">
            iComputers Store
          </span>
        </h1>

        <p className="max-w-xl text-sm text-gray-200 sm:text-base md:text-lg">
          Your one-stop destination for laptops, gaming PCs,
          accessories, and the latest technology.
        </p>

        <a
          href="/products"
          className="mt-2 rounded-xl bg-accent px-6 py-3 font-semibold text-white transition hover:scale-105"
        >
          Shop Now
        </a>

        <div className="mt-4 grid w-full max-w-sm grid-cols-3 gap-2 sm:max-w-lg sm:gap-4">

          <div className="flex flex-col items-center justify-center rounded-xl border border-white/20 bg-white/10 px-2 py-3 backdrop-blur-md sm:px-5">
            <h3 className="text-lg font-bold text-white sm:text-2xl">
              1000K+
            </h3>
            <p className="text-[11px] text-gray-300 sm:text-sm">
              Products
            </p>
          </div>

          <div className="flex flex-col items-center justify-center rounded-xl border border-white/20 bg-white/10 px-2 py-3 backdrop-blur-md sm:px-5">
            <h3 className="text-lg font-bold text-white sm:text-2xl">
              50K+
            </h3>
            <p className="text-[11px] text-gray-300 sm:text-sm">
              Customers
            </p>
          </div>

          <div className="flex flex-col items-center justify-center rounded-xl border border-white/20 bg-white/10 px-2 py-3 backdrop-blur-md sm:px-5">
            <h3 className="text-lg font-bold text-white sm:text-2xl">
              24/7
            </h3>
            <p className="text-[11px] text-gray-300 sm:text-sm">
              Service
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}