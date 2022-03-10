package com.tabeldata.bootcamp.controller;

import com.tabeldata.bootcamp.dao.ProductDao;
import com.tabeldata.bootcamp.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api")
public class Controller {

    @Autowired
    private ProductDao dao;

    @GetMapping("/list")
    public List<Product> list() {
        return dao.list();
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<?> findById(@PathVariable Integer id) {
        try {
            Product data = this.dao.findById(id);
            return ResponseEntity.ok(data);
        } catch (EmptyResultDataAccessException erdae) {
            return ResponseEntity.noContent().build();
        }
    }

    @GetMapping(value = "/show")
    public Product showData(
            @RequestParam(name = "name", required = true) String name,
            @RequestParam(name = "cat", required = true) String category,
            @RequestParam(name = "create", required = true) String create_by,
            Integer id,
            BigDecimal price)
    {
        Product data = new Product();
        data.setId(id);
        data.setName(name);
        data.setPrice(price);
        data.setCategory(category);
        data.setCreate_by(create_by);
        data.setCreate_date(LocalDate.now());
        return data;
    }

    @PostMapping(value = "/input")
    public ResponseEntity<?> insertData(@Valid @RequestBody Product data, BindingResult result) {
        Map<String, Object> hasil = new HashMap<>();

        if (result.hasErrors()) {
            hasil.put("status", result.getFieldErrors());
            return ResponseEntity.badRequest().body(hasil);
        } else {
            hasil.put("id", dao.insertData(data));
            hasil.put("status", "Succesfully");
            return ResponseEntity.ok(hasil);
        }
    }

    @PostMapping("/update")
    public ResponseEntity<Map<String, Object>>
    updateProduct(@RequestBody Product data) {
        Map<String, Object> hasil = new HashMap<>();
        dao.updateProduct(data);
        hasil.put("id", 0);
        hasil.put("status", "Update Succes");
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        this.dao.deleteProduct(id);
        return ResponseEntity.ok().build();
    }



}
