import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/Home.css';

const noticias = [
  { id: 1, title: 'Perez, Magnussen and Hulkenberg share contrasting views on start pile-up in Monaco', image: 'https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/t_16by9Centre/f_auto/q_auto/trackside-images/2024/F1_Grand_Prix_of_Monaco/2154728575', link: 'https://www.formula1.com/en/latest/article/perez-magnussen-and-hulkenberg-share-contrasting-views-on-start-pile-up-in.6RtIJGc09okzvJdq0nIjBw' },
  { id: 2, title: 'Alpine announce they will part ways with Ocon at end of 2024 season', image: 'https://media.formula1.com/image/upload/f_auto,c_limit,w_960,q_auto/f_auto/q_auto/fom-website/2024/Miscellaneous/ocon-portrait-2024-1', link: 'https://www.formula1.com/en/latest/article/breaking-alpine-announce-they-will-part-ways-with-ocon-at-end-of-2024-season.7ra4uaXdrYOHfklwU9TEqH' },
  { id: 3, title: 'EA Sports F1 24 launches with reimagined Career Mode, updated circuits and more new features', image: 'https://media.formula1.com/image/upload/f_auto,c_limit,w_960,q_auto/t_16by9Centre/f_auto/q_auto/fom-website/campaign/Licensing/EA%20F1%20Game/EA_F124_KEY_STANDARD_DISCRETE_LAYERS_14400x10200_RGB_03042024_50_', link: 'https://www.formula1.com/en/latest/article/ea-sports-f1-24-launches-with-reimagined-career-mode-updated-circuits-and.74BBrZE23KjlPRkyrS9VYg' },
  { id: 4, title: 'From Mansell mania to Senna in Sao Paulo – The most emotional home wins in F1', image: 'https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/t_16by9Centre/f_auto/q_auto/fom-website/2024/Miscellaneous/Formula%201%20header%20template%20(27)', link: 'https://www.formula1.com/en/latest/article/from-mansell-mania-to-senna-in-sao-paulo-the-most-emotional-home-wins-in-f1.35DuMXCpWFukDHWqZGaJdB' },
  { id: 5, title: 'Verstappen offers advice to Mercedes junior Antonelli while Russell assesses his prospects as a possible future team mate', image: 'https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/f_auto/q_auto/fom-website/2024/Monaco/russell-verstappen-antonelli-header', link: 'https://www.formula1.com/en/latest/article/verstappen-offers-advice-to-mercedes-junior-antonelli-while-russell-assesses.3NsKUWhbTjgpBzphxq9307' },
  { id: 6, title: '‘I haven’t made my mind up yet’ says Sainz as he assesses 2025 seat options ahead of Monaco', image: 'https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/t_16by9North/f_auto/q_auto/fom-website/2024/Monaco/GettyImages-2153676144', link: 'https://www.formula1.com/en/latest/article/i-havent-made-my-mind-up-yet-says-sainz-as-he-assesses-2025-seat-options.5DH7LobvMvAq51RzxnUXPZ' },
  { id: 7, title: 'TECH WEEKLY: How Mercedes new front wing hopes to address a significant shortfall with the W15', image: 'https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/t_16by9Centre/f_auto/q_auto/fom-website/2024/Tech%20Weekly/Tech_Weekly_Monaco_28052024', link: 'https://www.formula1.com/en/latest/article/tech-weekly-how-mercedes-new-front-wing-hopes-to-address-a-significant.2Oc1Hs2jjHZltk1T1CWswq' },
  { id: 8, title: 'TECH WEEKLY: How McLaren’s major Miami upgrade helped Norris secure his debut F1 win', image: 'https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/f_auto/q_auto/fom-website/2024/Tech%20Tuesday/Tech_Weekly_Miami', link: 'https://www.formula1.com/en/latest/article/tech-weekly-how-mclarens-major-miami-upgrade-helped-norris-secure-his-debut.6CKEntB7MJFFo2lOFjAsqr' },
];

const Home = () => {
  return (
    <div className="container home mt-4">
      <h1 className="text-center mb-4">Latest Formula 1 News</h1>
      <div className="row">
        {noticias.map(noticia => (
          <div key={noticia.id} className="col-md-3 col-sm-6 mb-4">
            <a href={noticia.link}>
              <img src={noticia.image} className="img-fluid rounded" alt={noticia.title} />
              <h5 className="mt-2 text-center">{noticia.title}</h5>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
