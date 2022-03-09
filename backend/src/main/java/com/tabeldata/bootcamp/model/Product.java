package com.tabeldata.bootcamp.model;


import lombok.Data;
import org.hibernate.validator.constraints.Length;


import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class Product {

    @NotNull
    private Integer id;

    @NotEmpty(message = "gak boleh kososng")
    @Length(min = 4, message = "Panjang Minimal 4")
    private String name;

    @Min(value = 0, message = "gak boleh minus")
    private BigDecimal price;

    @NotEmpty(message = "gak boleh kososng")
    private String category;

    private LocalDate create_date;
    private String create_by;





}
