import {
  Body,
  Section,
  Content,
} from "components/timoideas/Timoideas.components";
import style from "styles/pages/404.module.css";
import Head_Error from "heads/error.head";
import { useRouter } from "next/router";
import Link from "next/link";
export default function NotFound() {
  const { asPath } = useRouter();
  return (
    <>
      <Head_Error />
      <Body>
        <Section>
          <Content center flex={1} padding={0}>
            <code className={style.PathCode}>
              <path>{asPath}</path> route is not being controlled
            </code>

            <Link href="/">
              <div className={style.Back}>Return to homepage</div>
            </Link>
          </Content>
        </Section>
      </Body>
    </>
  );
}
