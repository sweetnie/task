package com.task.restaurant;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.util.HashMap;
import java.util.Map;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class RestaurantControllerTest {

    private RestaurantController restaurantController;
    String name = "New Restaurant - Cuisine";

    @BeforeEach
    public void setUp() {
        restaurantController = new RestaurantController();
    }

    @Test
    void testSubmitRestaurant() {
        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("name", name);

        ResponseEntity<Map<String, String>> responseEntity = restaurantController.submitRestaurant(requestBody);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertTrue(responseEntity.getBody().containsKey("name"));
        assertEquals(name, responseEntity.getBody().get("name"));
        assertTrue(restaurantController.getRestaurantList().stream()
                .anyMatch(restaurant -> restaurant.getName().equals(name)));
    }
}
