import harshaImage from '../assets/Harsha.jpeg';
import developerImage from '../assets/developer.png';
import recruiterImage from '../assets/Recutier.png';

const profiles = [
  { id: 'harsha', name: 'Harsha', initials: 'H', label: 'OWNER', image: harshaImage, imageAlt: 'Harsha Dasari' },
  { id: 'developer', name: 'Developer', initials: 'DEV', label: 'DEVELOPER', image: developerImage, imageAlt: 'Colorful developer code graphic' },
  { id: 'recruiter', name: 'Recruiter', initials: 'REC', label: 'RECRUITER', image: recruiterImage, imageAlt: 'Recruiter search icon' },
  { id: 'other', name: 'Other', initials: '+', label: 'GUEST', tone: 'from-[#552024] via-[#201518] to-[#101010]' }
];

const ProfileChooser = ({ onSelect }) => (
  <section className="relative min-h-screen bg-[#050505] text-white flex items-center justify-center px-6 py-16 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-[#120507] via-[#050505] to-black" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full bg-red-700/10 blur-[150px] pointer-events-none" />

    <div className="relative z-10 w-full max-w-5xl">
      <div className="text-center mb-12 md:mb-16">
        <div className="text-2xl font-black text-red-600 tracking-tighter drop-shadow-[0_2px_15px_rgba(220,9,20,0.7)] mb-8">
          HARSHA<span className="inline-block w-1.5 h-1.5 rounded-full bg-white ml-2 align-middle" />
        </div>
        <h1 className="text-3xl md:text-5xl font-light tracking-tight">Who's watching?</h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-8 md:gap-x-8">
        {profiles.map((profile) => (
          <button
            key={profile.id}
            type="button"
            onClick={() => onSelect(profile.id)}
            aria-label={`View portfolio as ${profile.name}`}
            className="group flex flex-col items-center gap-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-500"
          >
            <span className={`relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg border border-white/15 ${profile.tone ? `bg-gradient-to-br ${profile.tone}` : 'bg-[#141414]'} shadow-[0_18px_45px_rgba(0,0,0,0.65)] transition-all duration-300 group-hover:scale-[1.04] group-hover:border-red-500 group-hover:shadow-[0_20px_55px_rgba(229,9,20,0.3)]`}>
              {profile.image && <img src={profile.image} alt={profile.imageAlt} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />}
              <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-white/5" />
              {!profile.image && <span className="relative text-4xl md:text-6xl font-black text-white/90 drop-shadow-[0_0_25px_rgba(229,9,20,0.45)]">{profile.initials}</span>}
              <span className="absolute bottom-3 left-3 text-[9px] md:text-[10px] font-mono tracking-widest text-white/50">{profile.label}</span>
            </span>
            <span className="text-sm md:text-base text-white/60 transition-colors group-hover:text-white">{profile.name}</span>
          </button>
        ))}
      </div>
    </div>
  </section>
);

export default ProfileChooser;