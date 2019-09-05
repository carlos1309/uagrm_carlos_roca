package com.uagrm.examen.classes;

import java.util.concurrent.Callable;

public class FrothMilk implements Callable<String> {
    @Override
    public String call() throws Exception {
        Thread.sleep(1000);
        return "some milk";
    }
}
