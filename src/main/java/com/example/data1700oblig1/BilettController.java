package com.example.data1700oblig1;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class BilettController {

    @Autowired
    KundeRepository rep;

    public final List <filmer> filmRegister = new ArrayList<>();

    public BilettController() {
        filmer filmer1 = new filmer("Barbie");
        filmRegister.add(filmer1);
        filmer filmer2 = new filmer("Den lille havfruen");
        filmRegister.add(filmer2);
        filmer filmer3 = new filmer("Dune");
        filmRegister.add(filmer3);
        filmer filmer4 = new filmer("Mean Girls");
        filmRegister.add(filmer4);
    }



    @GetMapping("/hentFilmer")
    public List<filmer> hentFilmer() {
        return filmRegister;
    }

    @PostMapping("/lagre")
    public void lagre(kinoReservasjon billett) {rep.lagre(billett);
    }

    @GetMapping("/hentAlle")
    public List<kinoReservasjon> hentAlle() { return rep.hentAlle(); }

    @GetMapping("/slett")
    public void slett() { rep.slett(); }
}
