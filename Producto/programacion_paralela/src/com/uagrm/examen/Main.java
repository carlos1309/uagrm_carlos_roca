package com.uagrm.examen;

import com.uagrm.examen.classes.*;

import java.util.concurrent.*;

public class Main {

    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(2);

        FutureTask<String> heatWaterFuture = new FutureTask<String>(new HeatWater());
        FutureTask<String> grindBeans = new FutureTask<String>(new GrindBeans());
        FutureTask<String> brewCoffee = new FutureTask<String>(new Brew(grindBeans, heatWaterFuture));
        FutureTask<String> frothMilk = new FutureTask<String>(new FrothMilk());
        FutureTask<String> combineCoffee = new FutureTask<String>(new Combine(frothMilk, brewCoffee));

        executor.execute(heatWaterFuture);
        executor.execute(grindBeans);
        executor.execute(brewCoffee);
        executor.execute(frothMilk);
        executor.execute(combineCoffee);

        try {
            /**
             *  Warning this code is blocking !!!!!!!
             */
            System.out.println(combineCoffee.get(20, TimeUnit.SECONDS));
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        } catch (TimeoutException e) {
            System.out.println("20 SECONDS FOR A COFFEE !!!! I am !@#! leaving!!");
            e.printStackTrace();
        } finally{
            executor.shutdown();
        }
    }
}
