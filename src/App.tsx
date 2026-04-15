import './App.css';
import Button from "./components/Button";
import {Collapse} from './ui/Collapse';
import maskot from './assets/maskot 2.png';
import logo from './assets/LOGO FULL.png'
import Header from './components/Navbar';
import CardProduct from './components/CardProduct';
import wave from './assets/wave-haikei (3).png'
import wave_bot from './assets/wave-haikei (4).png'
import SpeakerCard from './ui/SpeakerCard';
// import Section from './components/Section';
import useInView from './hooks/useInView';


function App() {
   const [heroRef, heroShow] = useInView();
   const [aboutRef, aboutShow] = useInView();
   const [speakerRef, speakerShow] = useInView();
  //  const [collapseRef, collapseShow] = useInView();
   const speakers = [ 
   { 
     name: "Dery Agung Triyadi", 
     role: "Aws Indonesia", 
     imageUrl: 
       "https://www.invofest-harkatnegeri.com/assets/seminar/Seminar%20Dery.png", 
   }, 
   { 
     name: "Sowam Habibi", 
     role: "Google Indonesia", 
     imageUrl: 
       "https://www.invofest-harkatnegeri.com/assets/seminar/seminar%20sowam.png", 
   }, 
   { 
     name: "Lhuqita Fazry", 
     role: "Mobile Development Developer, Founder Rumah Coding Indonesia", 
     imageUrl: 
       "https://www.invofest-harkatnegeri.com/assets/workshop/workshop%20mobile.png", 
   }, 
 ]; 

 const collapseItems = [ 
   { 
     title: "Apa itu Invofest?", 
     description: 
       `Invofest (Informatics Vocational Festival) adalah festival tahunan yang 
bertujuan untuk menginspirasi dan memberdayakan generasi muda Indonesia dalam menghadapi 
era digital. Dengan mengusung tema "Beyond Limits, Beyond Intelligence: Innovate for a 
Smarter Tomorrow ".",`
  }, 
   { 
     title: "Kapan dan di mana Invofest akan diselenggarakan?", 
     description: 
       `Invofest akan diselenggarakan pada tanggal 15-17 November 2024 di Jakarta 
Convention Center (JCC), Jakarta, Indonesia.",` 
   }, 
   { 
     title: "Siapa saja yang dapat mengikuti Invofest?", 
     description: 
       `Invofest terbuka untuk semua kalangan, terutama mahasiswa, pelajar, profesional 
muda, dan siapa saja yang tertarik dengan teknologi dan inovasi. Acara ini dirancang 
untuk memberikan inspirasi dan pengetahuan kepada semua peserta, tanpa memandang latar 
belakang atau tingkat keahlian.", `
   }, 
 ]; 

  return (
    <div>
    <Header />
    <section 
  ref={heroRef}
  className="bg-white relative overflow-hidden z-0 pt-10"
>
  <div className='container mx-auto'>
    <div className="flex justify-between items-center gap-50">

      {/* KIRI */}
      <div className="flex flex-col gap-6 max-w-xl">

        <div className="flex flex-col gap-4">

          {/* LOGO */}
          <div className={`reveal ${heroShow ? "show animate-left" : ""}`}>
            <img src={logo} alt="" className='w-60' />
          </div>

          {/* TEXT */}
          <p className={`text-2xl w-3xl reveal ${heroShow ? "show animate-left" : ""}`}>
            Invofest atau Informatics Vocational Festival adalah event tahunan dan event terbesar 
            dari Himpunan Mahasiswa Teknik Informatika / HIMATIV Universitas Harkat Negeri.
          </p>

        </div>

        {/* BUTTON */}
        <div className={`flex gap-4 reveal ${heroShow ? "show animate-up" : ""}`}>
          <Button title="Detail Selengkapnya" variant='primary'/>
          <Button title="Hubungi Panitia" variant='outline' />
        </div>

      </div>

      {/* KANAN */}
      <div className={`w-1/2 flex justify-center reveal ${heroShow ? "show animate-right" : ""}`}>
        <img src={maskot} alt="maskot" className="w-130 ml-20" />
      </div>

    </div>
  </div>
</section>
    <div>
      <img src={wave} alt="" className='w-full opacity-20 '/>
    </div>
    <section ref = {aboutRef} className=' bg-[#da648f]/20 '>
          <div className='mx-auto ml-50'>
            <h1 className='font-semibold text-5xl pt-20 text-[#852e4e] reveal ${aboutShow ? "show animate-left" : ""}' >Tentang Invofest</h1>
            <p className='font-normal text-xl text-gray-700 mt-5 ml-5 mr-4 reveal ${aboutShow ? "show animate-left" : ""}'>Invofest 2026, adalah event yang diadakan setiap tahun oleh Himpunan Mahasiswa D4 Teknik Informatika (HIMATIV) 
              di Universitas Harkat Negeri Kota Tegal. Acara ini bertujuan  untuk menginpirasi dan memberdayakan generasi muda di Indonesia dalam menghadapi era digital.
            </p>
          </div>
          <div className="flex justify-center gap-6 mt-10 flex-wrap">

          {[
            {title:'IT Competition',desc:'...'},
            {title:'IT Workshop',desc:'...'},
            {title:'IT Seminar',desc:'...'},
            {title:'IT Talkshow',desc:'...'},
          ].map((item, i) => (

           <div
              key={i}
              className={`reveal ${aboutShow ? "show animate-up" : "opacity-100"}`}
              style={{ animationDelay: `${i * 0.2}s` }}
            >
      <CardProduct title={item.title} description={item.desc}>
        <Button title='Detail Selengkapnya' variant='primary'/>
      </CardProduct>
    </div>

  ))}

</div>
    </section>
          <div>
            <img src={wave_bot} alt="" className='w-full opacity-20'/>
          </div>
      <section ref={speakerRef} id="speaker" className="py-24">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-3"> 
                {speakers.map((speaker, index) => ( 
                   <div
                      key={index}
                      className={`reveal ${speakerShow ? "show animate-up" : ""}`}
                      style={speakerShow ? { animationDelay: `${index * 0.2}s` } : {}}
                    >
                  <SpeakerCard 
                    key={index} 
                    name={speaker.name} 
                    role={speaker.role} 
                    imageUrl={speaker.imageUrl} 
                  />
                  </div> 
                ))} 
              </div> 
       </section>
       <section id="collapse" className="py-24 flex flex-col gap-2 px-3"> 
              {collapseItems.map((item, index) => ( 
              <Collapse 
              key={index} 
              title={item.title} 
              description={item.description} 
              /> 
              ))} 
        </section>

    </div>
  )
}

export default App;
