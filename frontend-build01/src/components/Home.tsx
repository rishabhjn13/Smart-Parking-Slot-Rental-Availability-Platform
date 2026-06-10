import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('Find Parking');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = ['Find Parking', 'About', 'Contact'];

  return (
    <div className="min-h-screen bg-surface text-on-surface antialiased font-body-lg">
      {/* Top Navigation Bar */}
      <nav
        className={`w-full top-0 sticky z-50 bg-surface dark:bg-on-background border-b border-outline-variant dark:border-outline transition-shadow duration-300 ${isScrolled ? 'primary-shadow' : ''
          }`}
      >
        <div className="flex justify-between items-center h-16 px-gutter max-w-container-max mx-auto">
          <div className="flex items-center gap-md">
            <span className="text-headline-md font-headline-md font-bold text-on-surface dark:text-inverse-on-surface">
              ParkFlow
            </span>
          </div>

          <div className="flex items-center gap-md">
            <div className="hidden md:flex items-center gap-lg mr-md">
              {navLinks.map((tab) => (
                <a
                  key={tab}
                  className={`font-body-lg text-body-lg transition-colors ${activeTab === tab
                    ? 'text-primary dark:text-inverse-primary font-bold border-b-2 border-primary'
                    : 'text-on-surface-variant dark:text-surface-variant hover:text-primary'
                    }`}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab(tab);
                  }}
                >
                  {tab}
                </a>
              ))}
            </div>
            <button className="px-md py-sm rounded-lg font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-all">
              <Link to={"auth/login"} className="flex items-center gap-xs">
                <span className="material-symbols-outlined text-[18px]">account_circle</span>
                Sign In
              </Link>
            </button>
            <button className="px-lg py-sm bg-primary text-on-primary rounded-lg font-body-sm text-body-sm hover:opacity-90 scale-95 active:opacity-80 transition-all">
              Host Slot
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[819px] flex items-center overflow-hidden bg-surface-container-lowest">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-surface-container-lowest/50 via-transparent to-surface-container-low/50"></div>
        </div>
        <div className="relative z-10 max-w-container-max mx-auto px-gutter grid grid-cols-1 lg:grid-cols-12 gap-xl items-center py-xl">
          <div className="lg:col-span-7 flex flex-col gap-lg">
            <div className="inline-flex items-center gap-sm px-md py-xs bg-secondary-container text-on-secondary-container rounded-full w-fit">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span className="font-label-caps text-label-caps uppercase">Trusted by 10k+ Commuters</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg md:text-[56px] md:leading-[1.1] text-primary">
              Stress-free parking, <br />wherever the city takes you.
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[540px]">
              Stop circling the block. Instantly find, book, and navigate to secure private parking slots owned by verified local hosts.
            </p>
            <div className="flex flex-col sm:flex-row gap-md pt-base">
              <button className="flex items-center justify-center gap-sm px-xl py-md bg-primary text-on-primary rounded-lg font-body-lg text-body-lg hover:opacity-90 transition-all">
                <span className="material-symbols-outlined">search</span>
                Find a Slot
              </button>
              <button className="flex items-center justify-center gap-sm px-xl py-md border border-outline text-primary rounded-lg font-body-lg text-body-lg hover:bg-surface-container-low transition-all">
                <span className="material-symbols-outlined">add_location</span>
                Host your Space
              </button>
            </div>
            <div className="flex items-center gap-xl pt-lg border-t border-outline-variant">
              <div className="flex flex-col">
                <span className="font-headline-md text-headline-md text-primary">500k+</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Hours saved</span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-md text-headline-md text-primary">4.9/5</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">User rating</span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-md text-headline-md text-primary">24/7</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Support</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 hidden lg:block">
            <div className="relative">
              <div className="absolute -top-lg -left-lg w-32 h-32 bg-secondary-container rounded-full blur-3xl opacity-50"></div>
              <div className="glass-panel p-md rounded-xl primary-shadow">
                <img
                  alt="Premium parking spot"
                  className="w-full h-[480px] object-cover rounded-lg"
                  data-alt="A high-end, clean underground parking garage featuring polished concrete floors and bright, linear LED ceiling lighting. A sleek modern silver electric vehicle is parked perfectly within a well-marked slot. The atmosphere is quiet, secure, and technologically advanced, with a minimalist architectural style dominated by neutral grays and sharp, clean lines."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmFvESn65tVS1SsIBd6Wuk0SrhLQ3lo5gb_1nI27p4LrjiLXbo8xDhLTM8eqbA7d9JDET47EAbgCWPIJnXCgyJqR9Osl3ez4lQGaVN5f0Uv_gN3weA6KGH7VxRx3AfYpfN5mKDgALWsDjyonrvBEexqn-nRQX1olGIOGVlG6Bv49yYUbFnIT-dS7ZR71PNG6PWbOLHexBs_R9FvtxeRQ_YjYRrlNV7CdGmGGWkAEVJPI1BsIeWgaGEZVixtLYAAVLgYn5zpjXqpO8"
                />
                <div className="absolute top-lg right-lg px-md py-sm bg-primary text-on-primary rounded-lg font-bold">
                  $4.50/hr
                </div>
                <div className="absolute bottom-xl left-xl right-xl p-md bg-white/90 backdrop-blur rounded-lg border border-outline-variant flex justify-between items-center">
                  <div>
                    <p className="font-bold text-primary">Downtown Plaza A-12</p>
                    <p className="text-body-sm text-on-surface-variant">0.2 miles away</p>
                  </div>
                  <div className="px-md py-sm bg-secondary-container text-on-secondary-container rounded-lg font-bold">
                    Available
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section className="py-xl bg-surface">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="flex flex-col gap-sm mb-xl text-center md:text-left">
            <span className="font-label-caps text-label-caps text-on-secondary-container uppercase tracking-widest">Core Values</span>
            <h2 className="font-headline-lg text-headline-lg text-primary">Engineered for Reliability</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
            {/* Feature 1 */}
            <div className="group p-lg bg-white border border-outline-variant rounded-xl hover:border-primary transition-all duration-300">
              <div className="w-12 h-12 flex items-center justify-center bg-surface-container-low text-primary rounded-lg mb-lg group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined" data-icon="verified_user">verified_user</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-primary mb-sm">Verified Owners</h3>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                Every parking space and host undergoes a multi-step verification process to ensure safety and transparency.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="group p-lg bg-white border border-outline-variant rounded-xl hover:border-primary transition-all duration-300">
              <div className="w-12 h-12 flex items-center justify-center bg-surface-container-low text-primary rounded-lg mb-lg group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined" data-icon="update">update</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-primary mb-sm">Real-time Availability</h3>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                Our smart sensors and live updates ensure that the slot you book is ready and waiting exactly when you arrive.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="group p-lg bg-white border border-outline-variant rounded-xl hover:border-primary transition-all duration-300">
              <div className="w-12 h-12 flex items-center justify-center bg-surface-container-low text-primary rounded-lg mb-lg group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined" data-icon="security">security</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-primary mb-sm">Secure Payments</h3>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                Fully encrypted transactions with instant receipts. No more fumbling for change or paper tickets at kiosks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* User Journey */}
      <section className="py-xl bg-surface-container-lowest">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl items-center">
            <div className="relative order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-md">
                <div className="flex flex-col gap-md">
                  <img
                    alt="Search app"
                    className="rounded-xl border border-outline-variant grayscale hover:grayscale-0 transition-all duration-500 h-64 object-cover"
                    data-alt="A close-up of a high-resolution smartphone screen displaying a sleek parking application. The UI features a clean map with emerald green pins marking available slots. The hand holding the phone is slightly out of focus, set against a bright, modern urban daylight background with soft architectural shadows."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzzh-WXiLPWNgiDLPmhchj3KbzGh_xYfvGN7GpsM2vf1eoRa9oFJuujywpwtC0mqVrc0xRHBSA0WtxI0i-8haTKRQR9iW8djdRCf7ScwnOd2sgLIVtha1Vsoe4iKsih7YGj1PIllGqIKQqppbC2s8-YrReP1XPt1I0dYUCtOYeqnQY8xi4x_kW79NXyHkb6NgMeRMpszKOK_R61mBE6RE_PkgbBfarK76r3KCOzXqOYlym3mc5IWuOb1CfvyTuSr1gRnCT4PE6QI8"
                  />
                  <img
                    alt="Payment confirm"
                    className="rounded-xl border border-outline-variant grayscale hover:grayscale-0 transition-all duration-500 h-48 object-cover"
                    data-alt="A minimalist digital payment confirmation screen on a tablet. The screen displays a clear transaction ID in Geist Mono font, a bold checkmark, and the text 'Booking Confirmed'. The device rests on a clean, light-colored wooden surface in a bright, modern office or lobby environment."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIZzfTBSxNSTva8j3lYC7D-fnO8sgbOwehiFYn8tVkCP_lsfyipHkrFXztiEPP4voj-qA4ZNmIpBIfB4rjS-rB1W0rMhsSs-El7s6GT38gSMsoYREp04U27oVPJpB7VXGOIM7nrn8P3P1VX3NR8aJ3yucZnv1WzNf9g_8mpmIFiWHfJtXijXCBOH88snEBEUT5RA22j9BfCeRRFJVOd_BHw0L0SS6iQwp007wyx3FMVDhuGnQaFclXT2cTUmzB0LCJKskYx4ILy7I"
                  />
                </div>
                <div className="flex flex-col gap-md pt-xl">
                  <img
                    alt="Navigation"
                    className="rounded-xl border border-outline-variant grayscale hover:grayscale-0 transition-all duration-500 h-64 object-cover"
                    data-alt="A driver's perspective from inside a modern car, looking through the windshield at a clean, well-lit urban street. On the car's central dashboard display, a navigation map shows a clear blue path leading to a highlighted parking destination. The lighting is crisp and natural, emphasizing a high-contrast functionalist aesthetic."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1PqL-dWTuF5SXC84LO7qpbKUBDO0ulrRd00LIPM1r0skgouAY-zLzBBTu0m_P5E5uT3hMwNJhIoQO-MQlH9b5MZiIcyAG4bM1Duzjh6Fy1dGYEpjjq3ZrzpMo_vJiinOdLk_gHGQGHhJr0cJr-nHDLN8E0cMquA4Cue_EXEG75QCGkXopybBNodyBxrFqubgzf1ablBrheaRJKOZPnU9Hwky2nD11g_UNochSlEuBwiYotqrq0igH_p_a3zKzdWXyphsNUWpxN5w"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-lg order-1 lg:order-2">
              <span className="font-label-caps text-label-caps text-on-secondary-container uppercase tracking-widest">How It Helps</span>
              <h2 className="font-headline-lg text-headline-lg text-primary">Your Journey, Simplified</h2>
              <div className="flex flex-col gap-md">
                <div className="flex gap-md">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold">1</div>
                  <div>
                    <h4 className="font-bold text-primary">Search &amp; Compare</h4>
                    <p className="text-on-surface-variant">Enter your destination and browse available slots by price, distance, and host rating.</p>
                  </div>
                </div>
                <div className="flex gap-md">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold">2</div>
                  <div>
                    <h4 className="font-bold text-primary">Book Instantly</h4>
                    <p className="text-on-surface-variant">Secure your spot with one tap. Use our flexible hourly or daily rates tailored to your needs.</p>
                  </div>
                </div>
                <div className="flex gap-md">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold">3</div>
                  <div>
                    <h4 className="font-bold text-primary">Park &amp; Go</h4>
                    <p className="text-on-surface-variant">Navigate directly to your slot via GPS. Digital verification makes entry and exit seamless.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Slots (Marketplace Preview) */}
      <section className="py-xl bg-surface">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="flex justify-between items-end mb-xl">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-primary">Available Near You</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant">Premium slots in high-demand areas</p>
            </div>
            <button className="text-primary font-bold flex items-center gap-xs hover:underline">
              View All <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-lg">
            {/* Slot Card 1 */}
            <div className="bg-white border border-outline-variant rounded-lg overflow-hidden flex flex-col group">
              <div className="relative h-48 overflow-hidden">
                <img
                  alt="Luxury garage"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  data-alt="A clean, private driveway of a contemporary modern home with minimalist landscaping. The paving is high-quality gray stone, and the garage door is a sleek, dark charcoal wood. The scene is illuminated by soft, evening twilight with warm, subtle outdoor lighting, creating a high-trust, secure aesthetic."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBFidgr5vS9WzREI7nxmbuhZy5oqGkAUMuWBsjS40PAiBxRwFgTd2s_dD5tQ00YTXw9eTst9YnAKnIG3BJm4wLGNaeDirphBs-6E5wc2D4QHpFScZHbHcOBq3gVmS87FwzsXTKuG8-qYGeUof9njgXqI58jNjJApaPIeshCQLnMluEWNXSLChr6RZi4E8DOjphpp1YNm5k_MSitRKU7IOZGqesnLEOJR7JKTxkcEvzB5s56_Jgpj9Tlv01fa7NLywPW3Tmkmlcg8Y"
                />
                <div className="absolute top-md right-md px-md py-xs bg-primary text-on-primary rounded font-bold text-body-sm">$5.00/hr</div>
              </div>
              <div className="p-md flex flex-col gap-sm">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-primary">Financial District B2</h4>
                  <span className="material-symbols-outlined text-secondary" data-weight="fill">verified</span>
                </div>
                <div className="flex items-center gap-xs text-body-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px]">location_on</span>
                  0.1 miles away
                </div>
                <div className="mt-md pt-md border-t border-outline-variant flex justify-between items-center">
                  <span className="px-sm py-xs bg-secondary-container text-on-secondary-container text-[12px] font-bold rounded uppercase">Available</span>
                  <button className="font-bold text-primary text-body-sm">Book Now</button>
                </div>
              </div>
            </div>
            {/* Slot Card 2 */}
            <div className="bg-white border border-outline-variant rounded-lg overflow-hidden flex flex-col group">
              <div className="relative h-48 overflow-hidden">
                <img
                  alt="Apartment garage"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  data-alt="A modern apartment building's secure parking area with bright lighting and clearly marked white lines on a dark asphalt floor. The environment is impeccably clean and features high-definition security cameras visible in the corners, conveying a strong sense of safety and professional management."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMv1co7dS4mFiFW1gp2NGGwMCb-2hWaSkht4En14qIqDai5qTqwFBN8KSiaAV0xLigSVN8lUJOMKuduGF5RgE-5X02HVd_QICkDSuOaIRoOmap8KLCiNLLfQMvsdVVsV0usmeHvv5v2-OPSpAnolRvw7yLtgQ1oO_vbzM0-IQ1k8b9H4Fh9E7dNstwOnzdCzXmcIERpyq6AZJnolKguj9XcsFCAG0BTlzTS7yBoRA_TqCTseWmpz9u18AJdIB8w7CuF7TNHcMHZt8"
                />
                <div className="absolute top-md right-md px-md py-xs bg-primary text-on-primary rounded font-bold text-body-sm">$3.50/hr</div>
              </div>
              <div className="p-md flex flex-col gap-sm">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-primary">North Park Heights</h4>
                  <span className="material-symbols-outlined text-secondary" data-weight="fill">verified</span>
                </div>
                <div className="flex items-center gap-xs text-body-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px]">location_on</span>
                  0.5 miles away
                </div>
                <div className="mt-md pt-md border-t border-outline-variant flex justify-between items-center">
                  <span className="px-sm py-xs bg-secondary-container text-on-secondary-container text-[12px] font-bold rounded uppercase">Available</span>
                  <button className="font-bold text-primary text-body-sm">Book Now</button>
                </div>
              </div>
            </div>
            {/* Slot Card 3 */}
            <div className="bg-white border border-outline-variant rounded-lg overflow-hidden flex flex-col group">
              <div className="relative h-48 overflow-hidden">
                <img
                  alt="Retail lot"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  data-alt="A rooftop parking deck during the golden hour, providing a wide-open view of a modern city skyline in the distance. The lot is sparsely populated, showing plenty of open, available slots. The lighting is warm and cinematic, reflecting off the clean, well-maintained surface of the parking area."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVHFiwpZaQmmXi0gysIfZpbK3t6oPJLvtm5e9NRBLT5tDNhxpYXNyZMGGOUAqOQ1xqNGLibO2pOdFCSMfWNeVlRaCssoNrauoJ6-yDOK4-01UmU3OmWnhOy_n5qbi7RIhyf5VHw1uwOkrPPOIEMfVtRYCSVDrseLi5ItZARnXFQPG9bb4O4DS-jiY2vc5YK9z1gjempyZetX54NudxR4NbXGPCekGerYzVCZGSBAKR7v-2bnYLiIJi-qQ8kkC9JyItbKvcJ6LB4G0"
                />
                <div className="absolute top-md right-md px-md py-xs bg-primary text-on-primary rounded font-bold text-body-sm">$6.00/hr</div>
              </div>
              <div className="p-md flex flex-col gap-sm">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-primary">Skyline Rooftop</h4>
                  <span className="material-symbols-outlined text-secondary" data-weight="fill">verified</span>
                </div>
                <div className="flex items-center gap-xs text-body-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px]">location_on</span>
                  0.3 miles away
                </div>
                <div className="mt-md pt-md border-t border-outline-variant flex justify-between items-center">
                  <span className="px-sm py-xs bg-secondary-container text-on-secondary-container text-[12px] font-bold rounded uppercase">Available</span>
                  <button className="font-bold text-primary text-body-sm">Book Now</button>
                </div>
              </div>
            </div>
            {/* Slot Card 4 */}
            <div className="bg-white border border-outline-variant rounded-lg overflow-hidden flex flex-col group opacity-60">
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-primary/20 z-10 flex items-center justify-center">
                  <span className="bg-white/90 px-md py-xs rounded font-bold text-primary text-body-sm uppercase">Occupied</span>
                </div>
                <img
                  alt="Occupied slot"
                  className="w-full h-full object-cover"
                  data-alt="A minimalist, sleek car park with dark gray concrete and bright yellow safety markings. An electric luxury sedan is plugged into a wall-mounted charging station, clearly indicating the slot is in use. The aesthetic is industrial yet high-end, with focused spotlighting and a restricted color palette of grays, whites, and blacks."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiQOLOFRCm6PcVjUXEFttOWHmST3ZzgEDtPiK_8grZVFJs6M0ueRWy_6NmQ8x7NWqs36xIOXi9kCIY6CpeoNopDL6kUB-Ief18oOrVGJa4S5Tik_QELskyDEWQlA7WyWaP7UhOu74erQgR4ZWYNLb1uOEfw_muzA3oalK0e4GATBZ-oTqm0lBjFFPZMLXilNaQk6ow6XseziVlOgIWxwzlBUZGHlT4AWpqj5qEj_3FvgScDjoOOhMbMj2eI-w96SJkpDitjJm-I6M"
                />
              </div>
              <div className="p-md flex flex-col gap-sm">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-primary">Old Town Lane 4</h4>
                  <span className="material-symbols-outlined text-on-surface-variant">verified</span>
                </div>
                <div className="flex items-center gap-xs text-body-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px]">location_on</span>
                  0.8 miles away
                </div>
                <div className="mt-md pt-md border-t border-outline-variant flex justify-between items-center">
                  <span className="px-sm py-xs bg-surface-container-high text-on-surface-variant text-[12px] font-bold rounded uppercase">Occupied</span>
                  <button className="font-bold text-on-surface-variant text-body-sm cursor-not-allowed">Waitlist</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-on-primary py-xl">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-xl mb-xl">
            <div className="col-span-1 md:col-span-1 flex flex-col gap-md">
              <span className="text-headline-md font-bold">ParkFlow</span>
              <p className="text-on-primary-container text-body-sm">Building the future of urban infrastructure, one slot at a time.</p>
            </div>
            <div className="flex flex-col gap-md">
              <h5 className="font-bold uppercase text-label-caps tracking-widest text-secondary-fixed">Platform</h5>
              <nav className="flex flex-col gap-sm">
                <a className="text-on-primary-container hover:text-on-primary text-body-sm" href="#">Find Parking</a>
                <a className="text-on-primary-container hover:text-on-primary text-body-sm" href="#">Host a Space</a>
                <a className="text-on-primary-container hover:text-on-primary text-body-sm" href="#">Business Solutions</a>
              </nav>
            </div>
            <div className="flex flex-col gap-md">
              <h5 className="font-bold uppercase text-label-caps tracking-widest text-secondary-fixed">Company</h5>
              <nav className="flex flex-col gap-sm">
                <a className="text-on-primary-container hover:text-on-primary text-body-sm" href="#">About Us</a>
                <a className="text-on-primary-container hover:text-on-primary text-body-sm" href="#">Sustainability</a>
                <a className="text-on-primary-container hover:text-on-primary text-body-sm" href="#">Contact</a>
              </nav>
            </div>
            <div className="flex flex-col gap-md">
              <h5 className="font-bold uppercase text-label-caps tracking-widest text-secondary-fixed">Newsletter</h5>
              <div className="flex gap-xs">
                <input
                  className="bg-primary-container border-outline-variant text-body-sm rounded p-sm w-full focus:ring-secondary focus:border-secondary"
                  placeholder="Email address"
                  type="email"
                />
                <button className="p-sm bg-secondary-fixed text-on-secondary-fixed rounded hover:opacity-90 transition-all">
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
          <div className="pt-lg border-t border-on-primary-container/20 flex flex-col sm:flex-row justify-between items-center gap-md">
            <p className="text-body-sm text-on-primary-container">© 2024 ParkFlow Inc. All rights reserved.</p>
            <div className="flex gap-lg">
              <a className="text-on-primary-container hover:text-on-primary text-body-sm" href="#">Privacy Policy</a>
              <a className="text-on-primary-container hover:text-on-primary text-body-sm" href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
