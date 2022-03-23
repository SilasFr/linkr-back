--
-- PostgreSQL database dump
--

-- Dumped from database version 13.5 (Ubuntu 13.5-0ubuntu0.21.10.1)
-- Dumped by pg_dump version 13.5 (Ubuntu 13.5-0ubuntu0.21.10.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: likedPost; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."likedPost" (
    id integer NOT NULL,
    "postId" integer NOT NULL,
    "likeAuthor" integer NOT NULL
);


ALTER TABLE public."likedPost" OWNER TO postgres;

--
-- Name: likedPost_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."likedPost_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."likedPost_id_seq" OWNER TO postgres;

--
-- Name: likedPost_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."likedPost_id_seq" OWNED BY public."likedPost".id;


--
-- Name: links; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.links (
    id integer NOT NULL,
    link text NOT NULL,
    title text NOT NULL,
    description text,
    image text NOT NULL
);


ALTER TABLE public.links OWNER TO postgres;

--
-- Name: linksPosts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."linksPosts" (
    id integer NOT NULL,
    "linkId" integer NOT NULL,
    "postId" integer NOT NULL
);


ALTER TABLE public."linksPosts" OWNER TO postgres;

--
-- Name: linksPosts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."linksPosts_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."linksPosts_id_seq" OWNER TO postgres;

--
-- Name: linksPosts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."linksPosts_id_seq" OWNED BY public."linksPosts".id;


--
-- Name: links_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.links_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.links_id_seq OWNER TO postgres;

--
-- Name: links_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.links_id_seq OWNED BY public.links.id;


--
-- Name: posts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.posts (
    id integer NOT NULL,
    author integer NOT NULL,
    description text NOT NULL,
    "linkId" integer NOT NULL,
    "createdAt" date DEFAULT now() NOT NULL
);


ALTER TABLE public.posts OWNER TO postgres;

--
-- Name: postsTopics; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."postsTopics" (
    id integer NOT NULL,
    "postId" integer NOT NULL,
    "topicId" integer NOT NULL
);


ALTER TABLE public."postsTopics" OWNER TO postgres;

--
-- Name: postsTopics_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."postsTopics_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."postsTopics_id_seq" OWNER TO postgres;

--
-- Name: postsTopics_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."postsTopics_id_seq" OWNED BY public."postsTopics".id;


--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.posts_id_seq OWNER TO postgres;

--
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    token text NOT NULL,
    "expiresAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.sessions OWNER TO postgres;

--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sessions_id_seq OWNER TO postgres;

--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: topics; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.topics (
    id integer NOT NULL,
    topic text NOT NULL
);


ALTER TABLE public.topics OWNER TO postgres;

--
-- Name: topics_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.topics_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.topics_id_seq OWNER TO postgres;

--
-- Name: topics_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.topics_id_seq OWNED BY public.topics.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password character varying(255) NOT NULL,
    "profilePic" text NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: likedPost id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."likedPost" ALTER COLUMN id SET DEFAULT nextval('public."likedPost_id_seq"'::regclass);


--
-- Name: links id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.links ALTER COLUMN id SET DEFAULT nextval('public.links_id_seq'::regclass);


--
-- Name: linksPosts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."linksPosts" ALTER COLUMN id SET DEFAULT nextval('public."linksPosts_id_seq"'::regclass);


--
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);


--
-- Name: postsTopics id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."postsTopics" ALTER COLUMN id SET DEFAULT nextval('public."postsTopics_id_seq"'::regclass);


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: topics id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.topics ALTER COLUMN id SET DEFAULT nextval('public.topics_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: likedPost; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."likedPost" (id, "postId", "likeAuthor") FROM stdin;
\.


--
-- Data for Name: links; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.links (id, link, title, description, image) FROM stdin;
1	https://icon-icons.com/icon/brand-react/158742	REACT ICON	DESCRICAOBRABA AQUIMLK FALATU	https://cdn.icon-icons.com/icons2/2622/PNG/512/brand_react_icon_158742.png
\.


--
-- Data for Name: linksPosts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."linksPosts" (id, "linkId", "postId") FROM stdin;
1	1	1
\.


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.posts (id, author, description, "linkId", "createdAt") FROM stdin;
1	1	Esse link é brabo mesmo	1	2022-03-23
\.


--
-- Data for Name: postsTopics; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."postsTopics" (id, "postId", "topicId") FROM stdin;
2	1	1
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sessions (id, "userId", token, "expiresAt") FROM stdin;
\.


--
-- Data for Name: topics; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.topics (id, topic) FROM stdin;
1	technology
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password, "profilePic") FROM stdin;
1	dummy	dummy@dummy.com	$2b$10$abCsSUm1a0LkrmNEpXvr5.I5IxChjKzHgmtmRZULNxCqUaiIW8iua	https://portalpopline.com.br/wp-content/uploads/2021/04/9340060_x720-1.jpg
\.


--
-- Name: likedPost_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."likedPost_id_seq"', 1, false);


--
-- Name: linksPosts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."linksPosts_id_seq"', 1, true);


--
-- Name: links_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.links_id_seq', 1, true);


--
-- Name: postsTopics_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."postsTopics_id_seq"', 2, true);


--
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.posts_id_seq', 1, true);


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sessions_id_seq', 1, false);


--
-- Name: topics_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.topics_id_seq', 1, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: likedPost likedPost_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."likedPost"
    ADD CONSTRAINT "likedPost_pkey" PRIMARY KEY (id);


--
-- Name: linksPosts linksPosts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."linksPosts"
    ADD CONSTRAINT "linksPosts_pkey" PRIMARY KEY (id);


--
-- Name: links links_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.links
    ADD CONSTRAINT links_pkey PRIMARY KEY (id);


--
-- Name: postsTopics postsTopics_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."postsTopics"
    ADD CONSTRAINT "postsTopics_pkey" PRIMARY KEY (id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: topics topics_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.topics
    ADD CONSTRAINT topics_pkey PRIMARY KEY (id);


--
-- Name: topics topics_topic_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.topics
    ADD CONSTRAINT topics_topic_key UNIQUE (topic);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: likedPost likedPost_likeAuthor_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."likedPost"
    ADD CONSTRAINT "likedPost_likeAuthor_fkey" FOREIGN KEY ("likeAuthor") REFERENCES public.users(id);


--
-- Name: likedPost likedPost_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."likedPost"
    ADD CONSTRAINT "likedPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES public.posts(id);


--
-- Name: linksPosts linksPosts_linkId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."linksPosts"
    ADD CONSTRAINT "linksPosts_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES public.links(id);


--
-- Name: linksPosts linksPosts_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."linksPosts"
    ADD CONSTRAINT "linksPosts_postId_fkey" FOREIGN KEY ("postId") REFERENCES public.posts(id);


--
-- Name: postsTopics postsTopics_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."postsTopics"
    ADD CONSTRAINT "postsTopics_postId_fkey" FOREIGN KEY ("postId") REFERENCES public.posts(id);


--
-- Name: postsTopics postsTopics_topicId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."postsTopics"
    ADD CONSTRAINT "postsTopics_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES public.topics(id);


--
-- Name: posts posts_author_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_author_fkey FOREIGN KEY (author) REFERENCES public.users(id);


--
-- Name: posts posts_linkId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES public.posts(id);


--
-- Name: sessions sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

