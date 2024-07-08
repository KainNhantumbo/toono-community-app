import { Layout } from "@/components/layout";
import { useDocumentTitle } from "@uidotdev/usehooks";

export default function CodeOfConductPage() {
  useDocumentTitle("Code of Conduct - Toono Community");

  return (
    <Layout>
      <main className='mx-auto mb-3 flex w-full max-w-4xl gap-3 px-3'>
        <article className='mx-auto w-full max-w-3xl'>
          <h1 className='text-3xl font-bold'>Code of Conduct</h1>

          <p className=' mb-4'>
            Welcome to Toono Community! We are committed to providing a friendly, safe, and
            welcoming environment for all, regardless of gender, sexual orientation,
            disability, ethnicity, or religion.
          </p>

          <h2 className='text-2xl font-semibold'>1. Be Respectful</h2>
          <p className=' mb-4'>
            Treat everyone with respect. We do not tolerate harassment, discrimination, or
            any form of disrespectful behavior. This includes derogatory comments, personal
            attacks, or incitement to violence.
          </p>

          <h2 className='text-2xl font-semibold'>2. Be Considerate</h2>
          <p className=' mb-4'>
            Your actions and words affect others. Be considerate and thoughtful in your
            interactions, ensuring that you contribute positively to the community.
          </p>

          <h2 className='text-2xl font-semibold'>3. Avoid Offensive Behavior</h2>
          <p className=' mb-4'>
            Avoid using offensive language or sharing inappropriate content. This includes,
            but is not limited to, sexually explicit material, hate speech, and graphic
            violence.
          </p>

          <h2 className='text-2xl font-semibold'>4. Respect Privacy</h2>
          <p className=' mb-4'>
            Respect the privacy of others. Do not share personal information, photos, or any
            content that could violate someone’s privacy without their explicit permission.
          </p>

          <h2 className='text-2xl font-semibold'>5. Be Inclusive</h2>
          <p className=' mb-4'>
            We strive to create an inclusive community. Encourage participation from
            everyone and be supportive of new members.
          </p>

          <h2 className='text-2xl font-semibold'>6. Address Issues Constructively</h2>
          <p className=' mb-4'>
            If you encounter any issues or conflicts, address them constructively. Reach out
            to community moderators if necessary, and aim to resolve conflicts in a
            respectful manner.
          </p>

          <h2 className='text-2xl font-semibold'>7. Follow the Rules</h2>
          <p className=' mb-4'>
            Adhere to all community rules and guidelines. These are in place to ensure a
            safe and enjoyable experience for everyone.
          </p>

          <h2 className='text-2xl font-semibold'>8. Reporting Violations</h2>
          <p className=' mb-4'>
            If you witness or experience any violations of this Code of Conduct, please
            report them to the community moderators immediately. All reports will be handled
            confidentially.
          </p>

          <h2 className='text-2xl font-semibold'>9. Consequences</h2>
          <p className=' mb-4'>
            Violations of this Code of Conduct may result in consequences, including
            warnings, temporary suspension, or permanent removal from the community,
            depending on the severity of the violation.
          </p>

          <h2 className='text-2xl font-semibold'>
            10. Acknowledgment of Community Contributions
          </h2>
          <p className=' mb-4'>
            We value and appreciate the contributions of all community members. Recognize
            the efforts of others and give credit where it is due. Acknowledge the time and
            effort put in by volunteers and fellow members.
          </p>

          <h2 className='text-2xl font-semibold'>11. Collaboration and Support</h2>
          <p className=' mb-4'>
            Collaborate and support each other. Share knowledge, offer help, and encourage a
            spirit of teamwork and mutual respect.
          </p>

          <h2 className='text-2xl font-semibold'>12. Feedback and Improvement</h2>
          <p className=' mb-4'>
            Provide constructive feedback and suggestions for improvement. We are always
            looking to enhance the community experience and welcome your input.
          </p>

          <h2 className='text-2xl font-semibold'>13. Responsibility and Accountability</h2>
          <p className=' mb-4'>
            Take responsibility for your actions and be accountable for your behavior. If
            you make a mistake, acknowledge it and take steps to correct it.
          </p>

          <h2 className='text-2xl font-semibold'>14. Encouragement and Positivity</h2>
          <p className=' mb-4'>
            Encourage others and maintain a positive attitude. A supportive and positive
            environment helps everyone thrive.
          </p>

          <h2 className='text-2xl font-semibold'>15. Contact Information</h2>
          <p className=' mb-4'>
            If you have any questions or need further clarification about this Code of
            Conduct, please contact us at:
          </p>
          <p className=' mb-4'>
            Email:{" "}
            <a
              href='mailto:support@toono-community.com'
              className='text-blue-500 underline'>
              support@toono-community.com
            </a>
          </p>

          <p className=' mb-4'>
            Thank you for helping us create a positive and welcoming community!
          </p>
        </article>
      </main>
    </Layout>
  );
}
