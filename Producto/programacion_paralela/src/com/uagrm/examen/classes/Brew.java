package com.uagrm.examen.classes;

import java.util.concurrent.Callable;
import java.util.concurrent.Future;

public class Brew implements Callable<String> {
    final Future<String> grindedBeans;
    final Future<String> hotWater;

    public Brew(Future<String> grindedBeans, Future<String> hotWater) {
        this.grindedBeans = grindedBeans;
        this.hotWater = hotWater;
    }

    @Override
    public String call() throws Exception
    {
        System.out.println("brewing coffee with " + grindedBeans.get()
                + " and " + hotWater.get());
        Thread.sleep(1000);
        return "brewed coffee";
    }
}
