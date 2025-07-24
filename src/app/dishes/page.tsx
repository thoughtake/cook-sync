import useDishes from "@/hooks/useDishes";

const DishesPage = () => {
  const { dishes } = useDishes();

  return (
    <>
      <ul>
        {/* {dishes.map((dish) => (
          <li key={dish.id}>{dish.name}</li>
      ))} */}
      </ul>
    </>
  )
}

export default DishesPage;