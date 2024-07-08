import { Layout } from "@/components/layout";
import { useDocumentTitle } from "@uidotdev/usehooks";

export default function AboutPage() {
  useDocumentTitle("About - Toono Community");
  
  return (
    <Layout>
      <main className='mx-auto mb-3 flex w-full max-w-3xl gap-3 px-3'>
        <article>
          <h1 className='my-4 text-center text-4xl font-bold'>About Us</h1>
          <p className='mb-6 text-center'>
            Welcome to Toono Community! We are a passionate group dedicated to fostering a
            friendly, safe, and inclusive environment for all our members.
          </p>

          <h2 className='mb-4 text-2xl font-semibold'>Our Mission</h2>
          <p className='mb-4'>
            Our mission is to create a space where people from all walks of life can come
            together, share their experiences, and support one another. We believe in the
            power of community and strive to build a platform that encourages collaboration,
            learning, and growth.
          </p>

          <h2 className='mb-4 text-2xl font-semibold'>Our Values</h2>
          <ul className='mb-4 list-inside list-disc'>
            <li className='mb-2'>Respect: We treat everyone with dignity and respect.</li>
            <li className='mb-2'>
              Inclusivity: We embrace diversity and welcome everyone.
            </li>
            <li className='mb-2'>
              Support: We offer help and encouragement to all members.
            </li>
            <li className='mb-2'>Integrity: We act with honesty and transparency.</li>
            <li className='mb-2'>
              Growth: We foster an environment of continuous learning and development.
            </li>
          </ul>

          <h2 className='mb-4 text-2xl font-semibold'>Our Team</h2>
          <p className='mb-6'>
            Our team is composed of dedicated individuals who are passionate about building
            a strong and supportive community. We come from diverse backgrounds and bring a
            wide range of skills and experiences to the table.
          </p>

          <h2 className='mb-4 text-2xl font-semibold'>Our Story</h2>
          <p className='mb-4'>
            Toono Community was founded in 2023 with the vision of creating a platform where
            individuals could connect and share their stories. What started as a small group
            of enthusiasts has grown into a vibrant community of thousands of members. Our
            journey has been fueled by the passion and dedication of our community members,
            and we continue to evolve and grow together.
          </p>

          <h2 className='mb-4 text-2xl font-semibold'>Our Services</h2>
          <p className='mb-4'>
            We offer a range of services designed to support and empower our community
            members. From online forums and discussion groups to virtual events and
            workshops, we provide a variety of ways for members to connect, learn, and grow.
            Our resources include:
          </p>
          <ul className='mb-6 list-inside list-disc'>
            <li className='mb-2'>
              Discussion Forums: Engage in meaningful conversations with fellow members on a
              wide range of topics.
            </li>
            <li className='mb-2'>
              Virtual Events: Participate in webinars, workshops, and meetups hosted by
              experts and community leaders.
            </li>
            <li className='mb-2'>
              Resource Library: Access a wealth of articles, guides, and tools to help you
              navigate various aspects of life.
            </li>
            <li className='mb-2'>
              Mentorship Program: Connect with experienced mentors for guidance and support.
            </li>
          </ul>

          <h2 className='mb-4 text-2xl font-semibold'>Community Impact</h2>
          <p className='mb-6'>
            Our community has made a significant impact in the lives of our members. From
            personal growth and development to forming lasting friendships and professional
            connections, Toono Community is more than just a platform – it's a family. We
            are proud of the positive changes and achievements that our members have
            experienced and look forward to continuing to support and celebrate their
            successes.
          </p>

          <h2 className='mb-4 text-2xl font-semibold'>Get Involved</h2>
          <p className='mb-6'>
            We are always looking for enthusiastic and committed individuals to join our
            community. Whether you want to participate in discussions, share your knowledge,
            or simply connect with others, there is a place for you at Toono Community. Here
            are some ways you can get involved:
          </p>
          <ul className='mb-6 list-inside list-disc'>
            <li className='mb-2'>
              Join our forums and start participating in discussions.
            </li>
            <li className='mb-2'>Attend our virtual events and workshops.</li>
            <li className='mb-2'>Volunteer to be a mentor or host an event.</li>
            <li className='mb-2'>
              Share your experiences and insights through our resource library.
            </li>
          </ul>

          <p className='mb-4'>
            <strong>
              Thank you for being a part of our journey. Together, we can create something
              truly amazing!
            </strong>
          </p>
        </article>
      </main>
    </Layout>
  );
}
