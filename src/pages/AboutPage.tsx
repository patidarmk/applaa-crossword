import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AboutPage = () => {
  return (
    <Layout>
      <div className="container mx-auto p-4 md:p-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">
              About Crossword Cove
            </CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>
              Welcome to Crossword Cove, your new favorite destination for
              engaging and fun crossword puzzles. This application was built to
              showcase a modern, interactive, and beautifully designed web
              experience.
            </p>
            <p>
              Our puzzles are crafted to challenge your mind and provide a
              relaxing break from your day. Whether you're a seasoned crossword
              enthusiast or a newcomer to the world of puzzles, you'll find
              something to enjoy here.
            </p>
            <h3 className="text-xl font-semibold">Technology</h3>
            <p>
              This app is built with a modern tech stack including React,
              TypeScript, and Tailwind CSS, leveraging the power of Vite for a
              fast development experience. The UI components are from the
              excellent shadcn/ui library.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AboutPage;