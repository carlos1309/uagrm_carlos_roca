package com.uagrm.examen.classes;

import java.util.concurrent.Callable;

public class HeatWater implements Callable<String> {
    @Override
    public String call() throws Exception {
        System.out.println("Heating Water");
        Thread.sleep(1000);
        return "hot water";
    }
}
