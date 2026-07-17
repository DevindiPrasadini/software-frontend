export default function LandingPage() {
  return (
    <div className="relative fixed inset-0 h-dvh w-full overflow-hidden">
      
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
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        
        <span className="mb-3 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white backdrop-blur-md sm:text-sm">
          Premium Computer Store
        </span>

        <h1 className="max-w-4xl text-3xl font-bold text-white sm:text-5xl md:text-6xl">
          Welcome to
          <span className="block text-accent">
            iComputers Store
          </span>
        </h1>

        <p className="mt-4 max-w-xl text-sm text-gray-200 sm:text-base md:text-lg">
          Your one-stop destination for laptops, gaming PCs,
          accessories, and the latest technology.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href="/products"
            className="rounded-xl bg-accent px-6 py-3 font-semibold text-white transition hover:scale-105"
          >
            Shop Now
          </a>

         
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8">

  <div className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 backdrop-blur-md">
    <h3 className="text-xl font-bold text-white sm:text-2xl">
      1000K+
    </h3>
    <p className="text-xs text-gray-300 sm:text-sm">
      Products
    </p>
  </div>

  <div className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 backdrop-blur-md">
    <h3 className="text-xl font-bold text-white sm:text-2xl">
      50K+
    </h3>
    <p className="text-xs text-gray-300 sm:text-sm">
      Customers
    </p>
  </div>

  <div className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 backdrop-blur-md">
    <h3 className="text-xl font-bold text-white sm:text-2xl">
      24/7
    </h3>
    <p className="text-xs text-gray-300 sm:text-sm">
      Service
    </p>
  </div>

</div>
      </div>
    </div>
  );
}