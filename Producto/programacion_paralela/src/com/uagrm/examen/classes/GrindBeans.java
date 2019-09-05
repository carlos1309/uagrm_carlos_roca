package com.uagrm.examen.classes;

import java.util.concurrent.Callable;

public class GrindBeans implements Callable<String> {
    @Override
    public String call() throws Exception {
        System.out.println("Grinding Beans");
        Thread.sleep(2000);
        return "grinded beans";
    }
}
