import { type FC } from "react";
import { Helmet } from "react-helmet";

// props
type Props = {
  title: string;
  content: string;
};
const HeaderPage: FC<Props> = ({ content, title }: Props) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={content} />
      <link rel="icon" href="/logos/FIKOM-1024x1017.png" />
    </Helmet>
  );
};

export default HeaderPage;
