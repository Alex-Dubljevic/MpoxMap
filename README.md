## Inspiration

The inspiration behind MpoxMap stemmed from my experience during the COVID-19 pandemic, where I often used tracker tools to stay informed about the spread of the virus in Canada. These tools proved invaluable, providing real-time insights and helping me make informed decisions. When the novel Clade 1 Mpox outbreak began making headlines, I searched for a similar tool but found none. This gap in the market motivated me to create MpoxMap, a web app for monitoring Mpox. I wanted to develop a resource that not only keeps people informed but also has the potential to save lives by raising awareness about Mpox, how it spreads, and how it can be detected. As this is my first hackathon, and I’m participating solo, I set out to build something practical I could see myself and others using after the hackathon ends, and that's how I landed on making MpoxMap. 

## What it does

MpoxMap is a user-friendly web app designed to help users effortlessly monitor the spread of the Clade 1 Mpox outbreak. With an intuitive user experience, the app makes it simple for anyone to navigate its features. It includes an explainer section that educates users on what Mpox is, alongside an interactive 3D Mapbox-powered map that visualizes both current and historical cases worldwide. The map is continuously updated with the latest data from the CDC, WHO and UKHSA, ensuring users have access to the most up-to-date information. Additionally, MpoxMap features a real-time news section that pulls the latest articles on Mpox from TheNewsAPI, keeping users informed of any new developments. To further enhance its utility, the app offers a feature where users can sign up for personalized outbreak alerts, ensuring they receive timely notifications about new cases in their selected country. The many functions of MpoxMap are made possible by integrating key APIs, which serve as the backbone of its features.

## How I built it

MpoxMap is a web app built on Next.js 14 and deployed using Vercel, which I chose for its ability to help me learn new tech while enabling quick and easy deployment on a serverless platform. The frontend, made with React and styled using Tailwind CSS, also incorporates elements from Aceternity-UI to help craft the perfect user experience and the backend uses TypeScript, with Node.js as the package manager. The app’s standout feature is its stunning 3D maps, powered by the Mapbox API, which display custom vector tilesets created from my Mpox case dataset. To provide users with the latest updates on Mpox, I experimented with three different news APIs before selecting TheNewsAPI for its ability to deliver up-to-date information on specific topics. Additionally, I implemented a local caching system to avoid unnecessary API calls, optimizing performance. Upon startup, MpoxMap seamlessly integrates data from Mapbox and TheNewsAPI, rendering all layers efficiently while allowing for additional news content to be loaded on demand.

## Challenges I ran into

During the development of MpoxMap, one of the largest issues arose when I first deployed the app and discovered that the original news API I was using did not support CORS in its free tier. This meant that while the API functioned perfectly in my development environment, it failed to work in production. Faced with this obstacle, I had to quickly find an alternative. After testing several options, I settled on TheNewsAPI, but this required a complete overhaul of how I parsed the JSON responses from the GET requests. Additionally, I eventually exhausted the request limit on TheNewsAPI's free tier, which led me to implement a local caching system to reduce redundant API calls and optimize performance. These challenges not only tested my problem-solving skills but also provided valuable lessons in API management and resource optimization.

## Accomplishments that I'm proud of

One of my proudest accomplishments is successfully delivering a fully functioning project in my first solo hackathon. It required a lot of hard work and long nights, especially as I navigated learning Node.js 14 for the first time. I’m happy that I'm able to walk away from this experience with a wealth of new tech knowledge that I can apply to future projects and hackathons. I’m also particularly proud of how I tackled and resolved key bugs that had persisted for a while, which resulted in being able to deliver a more polished final product. This experience has reinforced my confidence in tackling complex challenges independently, something I find key in many aspects of school and work.

## What I learned

Throughout this project, I learned how to effectively use Node.js and Vercel in tandem to streamline and expedite the project deployment process. I also learned firsthand the critical importance of solid project management. Maintaining a detailed list of key action items and systematically working through them was vital to my success.  Furthermore, I gained valuable insights into Mpox itself, and I’m excited to share this knowledge with others through the app. These lessons not only enhanced my technical skills, but also improved my approach to managing and executing projects.

## What's next for Mpox Map

Future updates would include adding the ability to view data across specific time periods, which would provide users with deeper insights into the progression of Mpox outbreaks. Additionally, I’m exploring opportunities to integrate more interactive features, such as customizable alerts and detailed case analytics on a country-to-country basis. As the app gains more users, I look forward to expanding its reach and functionality, and I’m excited about the potential to further enhance MpoxMap and its impact on raising awareness about Mpox.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
