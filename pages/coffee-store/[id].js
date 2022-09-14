/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import cls from "classnames";
import useSWR from "swr";

import styles from "../../styles/coffee-store.module.css";
import { fetchCoffeeStores } from "../../lib/coffee-stores";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../store/store-context";
import { isEmpty } from "../../utils";

export async function getStaticProps(staticProps) {
  const { params } = staticProps;
  const coffeeStores = await fetchCoffeeStores(); // Collect dynamic data from /lib.
  const coffeeStoreFromContext = coffeeStores.find((coffeeStore) => {
    return coffeeStore.id.toString() === params.id; // dynamic ID
  });
  return {
    props: {
      // if findfindCoffeeStoreById exists, then findCoffeeStoreById, else create empty object
      // the empty object is the page! That givs getStaticPaths something to insert into, when dynamic.
      coffeeStore: coffeeStoreFromContext ? coffeeStoreFromContext : {},
    },
  };
}

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores();
  const paths = coffeeStores.map((coffeeStore) => {
    return {
      params: {
        id: coffeeStore.id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
}

function CoffeeStore(initialProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  // Get the id from the URL/router (to use for dynamic pages)
  const id = router.query.id;

  // Set the props to use the initial state
  const [coffeeStore, setCoffeeStore] = useState(initialProps.coffeeStore);

  // Get the state from context
  const {
    state: { coffeeStores },
  } = useContext(StoreContext);

  // Create coffeestore in Airtable
  const handleCreateCoffeeStore = async (coffeeStore) => {
    try {
      const { id, name, voting, imgUrl, neighborhood, address } = coffeeStore;
      // fetch the API
      const response = await fetch("/api/createCoffeeStore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          name,
          voting: 0,
          imgUrl,
          neighborhood: neighborhood || "",
          address: address || "",
        }),
      });
      const dbCoffeeStore = response.json();
      console.log({ dbCoffeeStore });
    } catch (err) {
      console.error("Error creating coffee store", err);
    }
  };

  useEffect(() => {
    // if coffeestore is empty, then use
    if (isEmpty(initialProps.coffeeStore)) {
      const findCoffeeStoreById = coffeeStores.find((coffeeStore) => {
        return coffeeStore.id.toString() === id; // dynamic ID
      });
      if (coffeeStores.length > 0) {
        setCoffeeStore(findCoffeeStoreById);
        handleCreateCoffeeStore(findCoffeeStoreById);
      }
    } else {
      // if it's not empty, it means it's a SSG
      handleCreateCoffeeStore(initialProps.coffeeStore);
    }
  }, [id, initialProps, initialProps.coffeeStore]);

  const { name, address, neighborhood, imgUrl } = coffeeStore;

  // Create a new state. Store it in state, and set it to 1 by default.
  const [votingCount, setVotingCount] = useState(1);

  // Retrieve data and error
  const { data, error } = useSWR(`/api/getCoffeeStoreById?id=${id}`, fetcher);

  // Make the count update, using data from getCoffeeStoreById
  useEffect(() => {
    // this is in the state, so i can update the state
    if (data && data.length > 0) {
      console.log("data from SWR", data);
      setCoffeeStore(data[0]);
      setVotingCount(data[0].voting);
    }
  }, [data]);

  const handleUpvoteButton = () => {
    console.log("handle upvote");
    // Add 1 to the count
    let count = votingCount + 1;
    // Set the new count
    setVotingCount(count);
  };

  if (error) {
    return <div>Something went wrong retrieving coffeeStore page.</div>;
  }

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">
              <a>← Back to home</a>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={
              imgUrl ||
              "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            }
            width={600}
            height={360}
            className={styles.storeImg}
            alt={name}
          />
        </div>

        <div className={cls("glass", styles.col2)}>
          {address && (
            <div className={styles.iconWrapper}>
              <Image
                src="/static/icons/places.svg"
                width="24"
                height="24"
                alt="Address"
              />
              <p className={styles.text}>{address}</p>
            </div>
          )}
          {neighborhood && (
            <div className={styles.iconWrapper}>
              <Image
                src="/static/icons/nearMe.svg"
                width="24"
                height="24"
                alt="Neighbourhood"
              />
              <p className={styles.text}>{neighborhood}</p>
            </div>
          )}
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/star.svg"
              width="24"
              height="24"
              alt="Rating"
            />
            <p className={styles.text}>{votingCount}</p>
          </div>

          <button
            className={styles.upvoteButton}
            type="submit"
            onClick={handleUpvoteButton}
          >
            Up vote!
          </button>
        </div>
      </div>
    </div>
  );
}

export default CoffeeStore;
export const fetcher = (url) => fetch(url).then((res) => res.json());
