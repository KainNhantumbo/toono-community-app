import { Layout } from "@/components/layout";
import { usePublicPostsQuery } from "@/hooks/use-public-posts-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";


export default function HomePage() {
  const { error, isLoading, hasNextPage, inViewRef, isError, refetch } =
    usePublicPostsQuery();

    return (
    <Layout>
      <main></main>
    </Layout>
  );
}
