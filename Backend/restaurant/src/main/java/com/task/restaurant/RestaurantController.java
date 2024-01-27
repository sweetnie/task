package com.task.restaurant;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class RestaurantController {

    private List<Restaurant> restaurantList;
    Random random = new Random();

    // set default restaurant name with location in list
    public RestaurantController() {
        this.restaurantList = new ArrayList<>();
        this.restaurantList.add(new Restaurant("Abu Bakar Roti Prata House - Sembawang"));
        this.restaurantList.add(new Restaurant("Thai Mookata - Holland Village"));
        this.restaurantList.add(new Restaurant("Dagalbi - Vivo City"));
    }

    @GetMapping("/restaurants")
    public List<Restaurant> getRestaurantsList() {
        return this.restaurantList;
    }

    @PostMapping("/submit")
    public ResponseEntity<Map<String, String>> submitRestaurant(@RequestBody Map<String, String> requestBody) {
        String name = requestBody.get("name");
        Restaurant newRestaurant = new Restaurant(name);
        restaurantList.add(newRestaurant);

        Map<String, String> response = new HashMap<>();
        response.put("name", newRestaurant.getName());

        return ResponseEntity.ok(response);

    }

    @GetMapping("/random")
    public ResponseEntity<Restaurant> getRandomRestaurant() {
        if (restaurantList.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        int randomIndex = random.nextInt(restaurantList.size());
        Restaurant randomRestaurant = restaurantList.get(randomIndex);

        return ResponseEntity.ok(randomRestaurant);
    }

    public List<Restaurant> getRestaurantList() {
        return restaurantList;
    }

    public void setRestaurantList(List<Restaurant> restaurantList) {
        this.restaurantList = restaurantList;
    }
}
