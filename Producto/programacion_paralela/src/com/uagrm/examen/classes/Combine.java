package com.uagrm.examen.classes;

import java.util.concurrent.Callable;
import java.util.concurrent.Future;

public class Combine implements Callable<String> {
    public Combine(Future<String> frothedMilk, Future<String> brewedCoffee) {
        super();
        this.frothedMilk = frothedMilk;
        this.brewedCoffee = brewedCoffee;
    }

    final Future<String> frothedMilk;
    final Future<String> brewedCoffee;

    @Override
    public String call() throws Exception {
        Thread.sleep(1000);
        System.out.println("Combining " + frothedMilk.get() + " "
                + brewedCoffee.get());
        return "Final Coffee";
    }

}
