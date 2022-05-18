import { useState } from "react";
import { FiEdit3, FiTrash } from "react-icons/fi";

import { Container } from "./styles";
import api from "../../services/api";

export interface FoodData {
  id: number;
  name: string;
  description: string;
  price: string;
  available: boolean;
  image: string;
}

interface FoodProps {
  food: FoodData;
  handleDelete: (id: number) => void;
  handleEditFood: (food: FoodData) => void;
}

export function Food(props: FoodProps) {
  const { food, handleDelete, handleEditFood } = props;

  const [isAvailable, setIsAvailable] = useState(food.available);

  //console.log(food);

  const setEditingFood = () => {
    handleEditFood(food);
  };

  const toggleAvailable = async () => {
    await api.put(`/foods/${food.id}`, {
      ...food,
      available: !isAvailable,
    });
    setIsAvailable(!isAvailable);
  };

  return (
    <Container available={isAvailable}>
      <header>
        <img src={food.image} alt={food.name} />
      </header>
      <section className="body">
        <h2>{food.name}</h2>
        <p>{food.description}</p>
        <p className="price">
          R$ <b>{food.price}</b>
        </p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={setEditingFood}
            data-testid={`edit-food-${food.id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDelete(food.id)}
            data-testid={`remove-food-${food.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="availability-container">
          <p>{isAvailable ? "Disponível" : "Indisponível"}</p>

          <label htmlFor={`available-switch-${food.id}`} className="switch">
            <input
              id={`available-switch-${food.id}`}
              type="checkbox"
              checked={isAvailable}
              onChange={toggleAvailable}
              data-testid={`change-status-food-${food.id}`}
            />
            <span className="slider" />
          </label>
        </div>
      </section>
    </Container>
  );
}

// class Foodx extends Component {
//   constructor(props) {
//     super(props);

//     const { available } = this.props.food;
//     this.state = {
//       isAvailable: available
//     };
//   }

//   toggleAvailable = async () => {
//     const { food } = this.props;
//     const { isAvailable } = this.state;

//     await api.put(`/foods/${food.id}`, {
//       ...food,
//       available: !isAvailable,
//     });

//     this.setState({ isAvailable: !isAvailable });
//   }

//   setEditingFood = () => {
//     const { food, handleEditFood } = this.props;

//     handleEditFood(food);
//   }

//   render() {
//     const { isAvailable } = this.state;
//     const { food, handleDelete } = this.props;

//     return (

//     );
//   }
// };

// export default Food;
