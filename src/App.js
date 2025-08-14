import {gql, useQuery} from "@apollo/client";
import HomeComponent from "./Home/homeComponent";

const GET_BRANDS = gql`
  query getBrands {
    findAllBrands {
      id
      image
    }
  }
`;

function App() {
  const {loading, error, data} = useQuery(GET_BRANDS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <HomeComponent />
    </div>
  );
}

export default App;
