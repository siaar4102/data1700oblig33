package com.example.data1700oblig1;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class KundeRepository {

    @Autowired
    private JdbcTemplate db;

    public void lagre(kinoReservasjon billett) {
        String sql = "INSERT INTO Kunde (velgFilm, antall, fornavn, etternavn, telefonnr, epost) VALUES(?.?)";
        db.update(sql, billett.getVelgFilm(), billett.getAntall(), billett.getFornavn(), billett.getEtternavn(), billett.getTelefonnr(), billett.getEpost());
    }

    public List<kinoReservasjon> hentAlle() {
        String sql = "SELECT * FROM Kunde";
        List<kinoReservasjon> alle = db.query(sql, new BeanPropertyRowMapper(kinoReservasjon.class));
        return alle;
    }

    public void slett() {
        String sql = "DELETE FROM Kunde";
        db.update(sql);
    }
}

