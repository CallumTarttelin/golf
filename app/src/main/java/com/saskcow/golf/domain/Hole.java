package com.saskcow.golf.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Hole {
    private int number;
    private String description;
    private int par;
}
